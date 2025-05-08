'use client'

import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { UseFormReturn } from 'react-hook-form'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot
} from '@/components/ui/common'

import { SignInSchema } from '@/schemas/auth/signIn'

interface TwoFactorFormProps {
	form: UseFormReturn<SignInSchema>
	onComplete: () => void
	isPending: boolean
	fieldName: 'emailCode' | 'totpCode'
}

export function TwoFactorForm({ form, onComplete, isPending, fieldName }: TwoFactorFormProps) {
	return (
		<div className='mx-auto w-full max-w-md space-y-4'>
			<Form {...form}>
				<FormField
					control={form.control}
					name={fieldName}
					render={({ field }) => (
						<FormItem className='flex flex-col items-center'>
							<FormControl>
								<InputOTP
									disabled={isPending}
									pattern={REGEXP_ONLY_DIGITS}
									onComplete={onComplete}
									maxLength={6}
									{...field}>
									<InputOTPGroup>
										<InputOTPSlot index={0} className='' />
										<InputOTPSlot index={1} className='' />
										<InputOTPSlot index={2} className='' />
									</InputOTPGroup>
									<InputOTPSeparator />
									<InputOTPGroup>
										<InputOTPSlot index={3} className='' />
										<InputOTPSlot index={4} className='' />
										<InputOTPSlot index={5} className='' />
									</InputOTPGroup>
								</InputOTP>
							</FormControl>
							<FormMessage className='mt-2' />
						</FormItem>
					)}
				/>
			</Form>
		</div>
	)
}
