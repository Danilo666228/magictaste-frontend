'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Loader2, Lock, Mail } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import ReCAPTCHA from 'react-google-recaptcha'

import { AuthWrapper } from '@/app/auth/AuthWrapper'

import { Button, Container, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui/common'
import { FormModal } from '@/components/ui/elements/modal/FormModal/FormModal'

import { useSignInForm } from '../(hooks)/useSignInForm'

import { TwoFactorEmailForm } from './TwoFactorEmailForm'
import { TwoFactorTotpForm } from './TwoFactorTotpForm'
import { ROUTE } from '@/config/route.config'
import { RECAPTCHA_SITE_KEY } from '@/lib/constants/url.constants'

export function SignInForm() {
	const {
		onSubmit,
		form,
		twoFactorEmail,
		twoFactorTotp,
		isPending,
		closeModals,
		recaptchaRef,
		handleRecaptchaExpired,
		handleRecaptchaChange
	} = useSignInForm()
	const { theme } = useTheme()

	return (
		<>
			<AuthWrapper
				title='Войдите в свой аккаунт'
				description='Войдите в свой аккаунт по почте и паролю'
				backLabel='Ещё нет аккаунта?'
				backLabelHref='Создать новый аккаунт'
				backHref={ROUTE.auth.signUp}>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
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
											type='email'
											placeholder='myemail@mail.ru'
											{...field}
											className='h-11 px-4 transition-all focus-visible:ring-primary/70'
										/>
									</FormControl>
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
											type='password'
											placeholder='******'
											{...field}
											className='h-11 px-4 transition-all focus-visible:ring-primary/70'
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<div className='flex justify-end'>
							<motion.div whileHover={{ x: 3 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
								<Link href={ROUTE.auth.newPassword} className='text-sm text-muted-foreground hover:text-primary'>
									Забыли пароль?
								</Link>
							</motion.div>
						</div>

						<ReCAPTCHA
							className='g-recaptcha hidden'
							ref={recaptchaRef}
							theme={theme === 'dark' ? 'dark' : 'light'}
							sitekey={RECAPTCHA_SITE_KEY}
							onChange={handleRecaptchaChange}
							size='invisible'
							onExpired={handleRecaptchaExpired}
							badge='bottomright'
						/>

						<motion.div
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
							<Button
								disabled={!form.formState.isValid || isPending}
								type='submit'
								className='group mt-2 h-12 w-full font-medium'
								onClick={e => {
									if (form.formState.isValid && !isPending) {
										e.preventDefault()
										recaptchaRef.current?.execute()
									}
								}}>
								{isPending ? <Loader2 className='mr-2 h-5 w-5 animate-spin' /> : null}
								{isPending ? (
									'Выполняется вход...'
								) : (
									<span className='flex items-center'>
										Войти в аккаунт
										<ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
									</span>
								)}
							</Button>
						</motion.div>
					</form>
				</Form>
			</AuthWrapper>

			<FormModal
				isOpen={twoFactorEmail}
				onOpenChange={closeModals}
				renderForm={() => <TwoFactorEmailForm form={form} onComplete={form.handleSubmit(onSubmit)} isPending={isPending} />}
				title='Введите код, отправленный на email'
				description='Введите код, отправленный на email'
			/>
			<FormModal
				isOpen={twoFactorTotp}
				onOpenChange={closeModals}
				renderForm={() => <TwoFactorTotpForm form={form} onComplete={form.handleSubmit(onSubmit)} isPending={isPending} />}
				title='Двухфакторная аутентификация TOTP'
				description='Введите код, отправленный на приложение 2FA'
			/>
		</>
	)
}
