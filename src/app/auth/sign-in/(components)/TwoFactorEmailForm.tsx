'use client'

import { UseFormReturn } from 'react-hook-form'

import { TwoFactorForm } from '@/app/auth/sign-in/(components)/TwoFactorForm'

import { SignInSchema } from '@/schemas/auth/signIn'

interface TwoFactorEmailFormProps {
	form: UseFormReturn<SignInSchema>
	onComplete: () => void
	isPending: boolean
}

export function TwoFactorEmailForm({ form, onComplete, isPending }: TwoFactorEmailFormProps) {
	return <TwoFactorForm form={form} onComplete={onComplete} isPending={isPending} fieldName='emailCode' />
}
