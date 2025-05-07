'use client'

import { UseFormReturn } from 'react-hook-form'

import { SignInSchema } from '@/schemas/auth/signIn'

import { TwoFactorForm } from '@/app/auth/sign-in/(components)/TwoFactorForm'

interface TwoFactorEmailFormProps {
	form: UseFormReturn<SignInSchema>
	onComplete: () => void
	isPending: boolean
}

export function TwoFactorEmailForm({ form, onComplete, isPending }: TwoFactorEmailFormProps) {
	return (
		<TwoFactorForm
			form={form}
			onComplete={onComplete}
			isPending={isPending}
			fieldName='emailCode'
			title='Проверка электронной почты'
			description='Введите 6-значный код, отправленный на вашу электронную почту'
		/>
	)
}
