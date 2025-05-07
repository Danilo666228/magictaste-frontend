'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Loader, Lock, Mail, User } from 'lucide-react'
import { useTheme } from 'next-themes'
import ReCAPTCHA from 'react-google-recaptcha'

import { AuthWrapper } from '@/app/auth/AuthWrapper'

import {
	Alert,
	AlertDescription,
	AlertTitle,
	Button,
	Container,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from '@/components/ui/common'

import { useSignUpForm } from '../(hooks)/useSignUpForm'


import { RECAPTCHA_SITE_KEY } from '@/lib/constants/url.constants'
import { ROUTE } from '@/config/route.config'

export function SignUpForm() {
	const { form, isPending, isSuccess, onSubmit, recaptchaRef, handleRecaptchaChange, handleRecaptchaExpired } = useSignUpForm()
	const { theme } = useTheme()

	const successVariants = {
		hidden: { opacity: 0, scale: 0.9 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.5,
				type: 'spring',
				stiffness: 100
			}
		}
	}

	return (
		<AuthWrapper
			title='Регистрация аккаунта'
			description='Создайте новый аккаунт для доступа к сервису'
			backLabel='Уже есть аккаунт?'
			backHref={ROUTE.auth.signIn}
			backLabelHref='Вход'>
			{isSuccess ? (
				<motion.div variants={successVariants} initial='hidden' animate='visible'>
					<Alert className='flex flex-col items-center gap-5 rounded-xl border-2 border-green-200 bg-green-50/50 py-8 shadow-md dark:bg-green-950/30'>
						<motion.div
							animate={{
								scale: [1, 1.2, 1],
								rotate: [0, 10, -10, 0]
							}}
							transition={{ duration: 1, delay: 0.5 }}>
							<CheckCircle size={64} className='text-green-500' />
						</motion.div>
						<AlertTitle className='text-center text-2xl font-bold'>Подтвердите почту</AlertTitle>
						<AlertDescription className='max-w-md text-center text-base'>
							На вашу почту отправлено письмо с ссылкой для подтверждения аккаунта. Пожалуйста, проверьте вашу почту и перейдите по
							ссылке.
						</AlertDescription>
					</Alert>
				</motion.div>
			) : (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
						<FormField
							control={form.control}
							name='userName'
							render={({ field }) => (
								<FormItem className='space-y-1.5'>
									<Container className='flex items-center justify-between'>
										<FormLabel className='flex items-center gap-2'>
											<User className='h-4 w-4 text-muted-foreground' />
											Логин
										</FormLabel>
										<FormMessage />
									</Container>
									<FormControl>
										<Input
											placeholder='Введите ваш логин'
											type='text'
											{...field}
											className='h-11 px-4 transition-all focus-visible:ring-primary/70'
										/>
									</FormControl>
									<FormDescription className='text-xs'>Логин должен быть уникальным</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem className='space-y-1.5'>
									<Container className='flex items-center justify-between'>
										<FormLabel className='flex items-center gap-2'>
											<Mail className='h-4 w-4 text-muted-foreground' />
											Электронная почта
										</FormLabel>
										<FormMessage />
									</Container>
									<FormControl>
										<Input
											placeholder='myemail@mail.ru'
											{...field}
											type='text'
											className='h-11 px-4 transition-all focus-visible:ring-primary/70'
										/>
									</FormControl>
									<FormDescription className='text-xs'>Ваша почта для входа в аккаунт</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem className='space-y-1.5'>
									<Container className='flex items-center justify-between'>
										<FormLabel className='flex items-center gap-2'>
											<Lock className='h-4 w-4 text-muted-foreground' />
											Пароль
										</FormLabel>
										<FormMessage />
									</Container>
									<FormControl>
										<Input
											placeholder='Введите пароль'
											type='password'
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
										<FormLabel className='flex items-center gap-2'>
											<Lock className='h-4 w-4 text-muted-foreground' />
											Повторите пароль
										</FormLabel>
										<FormMessage />
									</Container>
									<FormControl>
										<Input
											placeholder='Повторите пароль'
											type='password'
											{...field}
											onChange={field.onChange}
											className='h-11 px-4 transition-all focus-visible:ring-primary/70'
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<motion.div
							className='my-2 flex justify-center'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3 }}>
							<ReCAPTCHA
								className='hidden'
								size='invisible'
								ref={recaptchaRef}
								sitekey={RECAPTCHA_SITE_KEY}
								onChange={handleRecaptchaChange}
								onExpired={handleRecaptchaExpired}
								theme={theme === 'dark' ? 'dark' : 'light'}
								badge='bottomright'
							/>
						</motion.div>

						<Button
							className='group mt-2 h-12 w-full font-medium'
							onClick={form.handleSubmit(onSubmit)}
							disabled={!form.formState.isValid || isPending}>
							{isPending ? <Loader className='mr-2 h-5 w-5 animate-spin' /> : null}
							{isPending ? 'Регистрация...' : 'Зарегистрироваться'}
						</Button>
					</form>
				</Form>
			)}
		</AuthWrapper>
	)
}
