'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import {
	Alert,
	AlertDescription,
	AlertTitle,
	Button,
	Container,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from '@/components/ui/common'

import { NewPasswordSchema, newPasswordSchema } from '@/schemas/auth/newPassword'

import { useResetPasswordMutation } from '@/shared/api/hooks/auth/useResetPasswordMutation'

import { AuthWrapper } from '../../AuthWrapper'

export function RecoveryPasswordForm() {
	const { mutate: resetPassword, isPending, isSuccess } = useResetPasswordMutation()
	const form = useForm<NewPasswordSchema>({
		defaultValues: {
			email: ''
		},
		resolver: zodResolver(newPasswordSchema)
	})

	const onSubmit = (data: NewPasswordSchema) => {
		resetPassword({ params: { email: data.email } })
	}

	return isSuccess ? (
		<Alert>
			<AlertTitle>Ссылка на восстановление пароля отправлена на вашу почту</AlertTitle>
			<AlertDescription>Пожалуйста, проверьте ваш email для восстановления пароля.</AlertDescription>
		</Alert>
	) : (
		<AuthWrapper title='Восстоновление пароля' description='Пожалуйста, введите ваш email для восстановления пароля.'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='space-y-1.5'>
								<Container className='flex items-center justify-between'>
									<FormLabel className='flex items-center gap-2'>Email</FormLabel>
									<FormMessage />
								</Container>
								<FormControl>
									<Input
										type='email'
										placeholder='myemail@mail.ru'
										{...field}
										className='h-11 px-4 transition-all focus-visible:ring-primary/70'
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<Button type='submit' className='w-full' disabled={isPending}>
						{isPending ? <Loader2 className='h-4 w-4 animate-spin' /> : 'Отправить'}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
