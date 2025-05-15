import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import { ReCAPTCHA } from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useAuth } from '@/hooks/useAuth'

import { SignInSchema, signInSchema } from '@/schemas/auth/signIn'

import { usePostSignInMutation } from '@/shared/api/hooks/auth/usePostSignInMutation'
import { ROUTE } from '@/config/route.config'

export function useSignInForm() {
	const router = useRouter()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
	const [twoFactorType, setTwoFactorType] = useState<'email' | 'totp' | null>(null)
	const { authorized } = useAuth()
	const recaptchaRef = useRef<ReCAPTCHA>(null)

	const form = useForm<SignInSchema>({
		mode: 'onChange',
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: '',
			totpCode: '',
			emailCode: ''
		}
	})
	const { mutateAsync: signIn, isPending } = usePostSignInMutation({
		options: {
			onSuccess({ data }) {
				const currentValues = form.getValues()

				if (data.requiredMethods?.totp) {
					setTwoFactorType('totp')
					if (twoFactorType === 'email' && currentValues.emailCode) {
						form.setValue('totpCode', '')
					} else {
						form.setValue('totpCode', '')
					}
				} else if (data.requiredMethods?.email) {
					setTwoFactorType('email')
					if (twoFactorType === 'totp' && currentValues.totpCode) {
						form.setValue('emailCode', '')
					} else {
						form.setValue('emailCode', '')
					}
				} else {
					authorized()
					router.push(ROUTE.dashboard.profile)
				}
			},
			onError: () => {
				if (!twoFactorType) {
					recaptchaRef.current?.reset()
				}
			}
		}
	})

	const closeModals = useCallback(() => {
		setTwoFactorType(null)
	}, [])

	const handleRecaptchaExpired = useCallback(() => {
		closeModals()
		recaptchaRef.current?.reset()
		form.reset()
		toast.error('Капча истекла, пожалуйста, подтвердите, что вы не робот')
	}, [closeModals])

	const handleRecaptchaChange = useCallback(
		(token: string | null) => {
			setRecaptchaValue(token)

			if (token && form.formState.isValid) {
				const data = form.getValues()

				const canProceed =
					!twoFactorType || (twoFactorType === 'totp' && data.totpCode) || (twoFactorType === 'email' && data.emailCode)

				if (canProceed) {
					signIn({
						params: {
							email: data.email,
							password: data.password,
							totpCode: data.totpCode || undefined,
							emailCode: data.emailCode || undefined,
							recaptcha: token
						}
					})
				}
			}
		},
		[form, signIn, twoFactorType]
	)

	function onSubmit() {
		if (form.formState.isValid) {
			recaptchaRef.current?.reset()
			recaptchaRef.current?.execute()
		}
	}

	return {
		form,
		onSubmit,
		isPending,
		twoFactorEmail: twoFactorType === 'email',
		twoFactorTotp: twoFactorType === 'totp',
		closeModals,
		recaptchaValue,
		handleRecaptchaChange,
		recaptchaRef,
		handleRecaptchaExpired
	}
}
