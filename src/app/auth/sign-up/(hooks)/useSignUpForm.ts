import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import { TypeSignUpSchema, signUpSchema } from '@/schemas/auth/signUp'

import { usePostSignUpMutation } from '@/shared/api/hooks/auth/usePostSignUpMutation'

export function useSignUpForm() {
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
	const recaptchaRef = useRef<ReCAPTCHA>(null)

	const {
		mutate: signUp,
		isSuccess,
		isPending
	} = usePostSignUpMutation({
		options: {
			onError: () => {
				setRecaptchaValue(null)
				recaptchaRef.current?.reset()
			}
		}
	})
	const form = useForm<TypeSignUpSchema>({
		mode: 'onChange',
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			userName: '',
			email: '',
			password: '',
			passwordRepeat: ''
		}
	})

	const handleRecaptchaExpired = () => {
		setRecaptchaValue(null)
		recaptchaRef.current?.reset()
	}

	const handleRecaptchaChange = useCallback(
		(token: string | null) => {
			setRecaptchaValue(token)

			if (token && form.formState.isValid) {
				const data = form.getValues()

				signUp({
					params: {
						email: data.email,
						password: data.password,
						userName: data.userName,
						passwordRepeat: data.passwordRepeat,
						recaptcha: token
					}
				})
			}
		},
		[form, signUp]
	)

	function onSubmit() {
		recaptchaRef.current?.reset()
		recaptchaRef.current?.execute()
	}

	return {
		form,
		onSubmit,
		isPending,
		isSuccess,
		recaptchaValue,
		setRecaptchaValue,
		recaptchaRef,
		handleRecaptchaChange,
		handleRecaptchaExpired
	}
}
