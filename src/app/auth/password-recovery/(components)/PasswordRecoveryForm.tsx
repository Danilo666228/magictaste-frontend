'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { Button, Input } from '@/components/ui/common'
import { Container } from '@/components/ui/common/Container'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/common/Form'

import { PasswordRecoverySchema, passwordRecoverySchema } from '@/schemas/auth/passwordRecovery'

import { usePasswordRecoveryMutation } from '@/shared/api/hooks/auth/usePasswordRecoveryMutation'

import { ROUTE } from '@/config/route.config'

export function PasswordRecoveryForm() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const form = useForm<PasswordRecoverySchema>({
		resolver: zodResolver(passwordRecoverySchema)
	})

	const { mutate: passwordRecovery, isPending } = usePasswordRecoveryMutation({
		options: {
			onSuccess: () => router.push(ROUTE.auth.signIn)
		}
	})

	const onSubmit = (data: PasswordRecoverySchema) => {
		passwordRecovery({
			params: { password: data.password, passwordRepeat: data.passwordRepeat },
			config: { params: { token: searchParams.get('token') } }
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem className='space-y-1.5'>
							<Container className='flex items-center justify-between'>
								<FormLabel className='flex items-center gap-2'>Пароль</FormLabel>
								<FormMessage />
							</Container>
							<FormControl>
								<Input
									type='password'
									placeholder='******'
									{...field}
									className='h-11 px-4 transition-all focus-visible:ring-primary/70'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='passwordRepeat'
					render={({ field }) => (
						<FormItem className='space-y-1.5'>
							<Container className='flex items-center justify-between'>
								<FormLabel className='flex items-center gap-2'>Повторите пароль</FormLabel>
								<FormMessage />
							</Container>
							<FormControl>
								<Input
									type='password'
									placeholder='******'
									{...field}
									className='h-11 px-4 transition-all focus-visible:ring-primary/70'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full' disabled={isPending}>
					{isPending ? 'Выполняется...' : 'Восстановить пароль'}
				</Button>
			</form>
		</Form>
	)
}
