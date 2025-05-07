'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Container,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Typography
} from '@/components/ui/common'

import { useChangePasswordForm } from '../../(hooks)/useChangePasswordForm'

interface ChangePasswordState {
	oldPassword: boolean
	newPassword: boolean
}

export function ChangePasswordForm() {
	const { form, onSubmit, isPending } = useChangePasswordForm()
	const [showPassword, setShowPassword] = useState<ChangePasswordState>({
		oldPassword: false,
		newPassword: false
	})

	const handleShowPassword = (field: 'oldPassword' | 'newPassword') => {
		setShowPassword({ ...showPassword, [field]: !showPassword[field] })
	}

	return (
		<Card>
			<CardHeader className='bg-muted/30 pb-4'>
				<CardTitle className='text-xl'>Смена пароля</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-col gap-5 pt-4'>
				<Typography className='text-sm text-muted-foreground'>
					Пароль — ключ к вашей учетной записи. Никому его не сообщайте. При необходимости вы можете изменить его здесь для повышения
					безопасности.
				</Typography>
				<Form {...form}>
					<form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='oldPassword'
							render={({ field }) => (
								<FormItem className='px-0'>
									<Container className='flex items-center justify-between p-0'>
										<FormLabel className='text-sm font-medium'>Cтарый пароль</FormLabel>
										<FormMessage />
									</Container>
									<FormControl>
										<div className='relative'>
											<Input className='pr-10' type={showPassword.oldPassword ? 'text' : 'password'} {...field} />
											<Button
												onClick={() => handleShowPassword('oldPassword')}
												type='button'
												variant='outline'
												size='icon'
												className='absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 transform border-none bg-transparent'>
												{showPassword.oldPassword ? <EyeOff /> : <Eye />}
											</Button>
										</div>
									</FormControl>
									<FormDescription className='text-xs'>Ваша почта для входа и уведомлений</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='newPassword'
							render={({ field }) => (
								<FormItem className='px-0'>
									<Container className='flex items-center justify-between p-0'>
										<FormLabel className='text-sm font-medium'>Новый пароль</FormLabel>
										<FormMessage />
									</Container>
									<FormControl>
										<div className='relative'>
											<Input className='pr-10' type={showPassword.newPassword ? 'text' : 'password'} {...field} />
											<Button
												type='button'
												variant='outline'
												size='icon'
												onClick={() => handleShowPassword('newPassword')}
												className='absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 transform border-none bg-transparent'>
												{showPassword.newPassword ? <EyeOff /> : <Eye />}
											</Button>
										</div>
									</FormControl>
									<FormDescription className='text-xs'>Ваш новый пароль для входа в систему</FormDescription>
								</FormItem>
							)}
						/>
						{form.formState.isValid && (
							<Button type='submit' disabled={isPending} className='w-full'>
								{isPending ? 'Сохранение...' : 'Сохранить'}
							</Button>
						)}
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
