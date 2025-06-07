'use client'

import { UseFormReturn } from 'react-hook-form'

import { TwoFactorForm } from '@/app/auth/sign-in/(components)/TwoFactorForm'

import { SignInSchema } from '@/schemas/auth/signIn'

interface TwoFactorTotpFormProps {
	form: UseFormReturn<SignInSchema>
	onComplete: () => void
	isPending: boolean
}

export function TwoFactorTotpForm({ form, onComplete, isPending }: TwoFactorTotpFormProps) {
	return <TwoFactorForm form={form} onComplete={onComplete} isPending={isPending} fieldName='totpCode' />
}
