'use client'

import { ArrowRight, Loader2, Lock, Mail } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import ReCAPTCHA from 'react-google-recaptcha'

import { AuthWrapper } from '@/app/auth/AuthWrapper'

import {
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

import { useSignInForm } from '../(hooks)/useSignInForm'

import { TwoFactorEmailForm } from './TwoFactorEmailForm'
import { ROUTE } from '@/config/route.config'
import { RECAPTCHA_SITE_KEY } from '@/lib/constants/url.constants'
import { Modal } from '@/components/ui/elements/modal/Default/Modal'
import { TwoFactorTotpForm } from '@/app/auth/sign-in/(components)/TwoFactorTotpForm'

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
				title="Войдите в свой аккаунт"
				description="Войдите в свой аккаунт по почте и паролю"
				backLabel="Ещё нет аккаунта?"
				backLabelHref="Создать новый аккаунт"
				backHref={ROUTE.auth.signUp}>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="space-y-1.5">
									<Container className="flex items-center justify-between">
										<FormLabel className="flex items-center gap-2">
											<Mail className="h-4 w-4 text-muted-foreground" />
											Электронная почта
										</FormLabel>
										<FormMessage />
									</Container>
									<FormControl>
										<Input
											type="email"
											placeholder="myemail@mail.ru"
											{...field}
											className="h-11 px-4 transition-all focus-visible:ring-primary/70"
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="space-y-1.5">
									<Container className="flex items-center justify-between">
										<FormLabel className="flex items-center gap-2">
											<Lock className="h-4 w-4 text-muted-foreground" />
											Пароль
										</FormLabel>
										<FormMessage />
									</Container>
									<FormControl>
										<Input
											type="password"
											placeholder="******"
											{...field}
											className="h-11 px-4 transition-all focus-visible:ring-primary/70"
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<div className="flex justify-end">
							<Link href={ROUTE.auth.newPassword} className="text-sm text-muted-foreground hover:text-primary">
								Забыли пароль?
							</Link>
						</div>

						<ReCAPTCHA
							className="g-recaptcha hidden"
							ref={recaptchaRef}
							theme={theme === 'dark' ? 'dark' : 'light'}
							sitekey={RECAPTCHA_SITE_KEY}
							
							onChange={handleRecaptchaChange}
							size="invisible"
							onExpired={handleRecaptchaExpired}
							badge="bottomleft"
						/>

						<Button
							disabled={!form.formState.isValid || isPending}
							type="submit"
							className="group mt-2 h-12 w-full font-medium"
							onClick={e => {
								if (form.formState.isValid && !isPending) {
									e.preventDefault()
									recaptchaRef.current?.execute()
								}
							}}>
							{isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
							{isPending ? (
								'Выполняется вход...'
							) : (
								<span className="flex items-center">
									Войти в аккаунт
									<ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
								</span>
							)}
						</Button>
					</form>
				</Form>
			</AuthWrapper>
			<Modal title={'Введите код, отправленный на почту'} open={twoFactorEmail} onOpenChange={closeModals}>
				<TwoFactorEmailForm form={form} onComplete={form.handleSubmit(onSubmit)} isPending={isPending} />
			</Modal>
			<Modal title={'Двухфакторная аутентификация TOTP'} description={'Введите код из приложение 2FA'}
						 open={twoFactorTotp} onOpenChange={closeModals}>
				<TwoFactorTotpForm form={form} onComplete={form.handleSubmit(onSubmit)} isPending={isPending} />
			</Modal>
		</>
	)
}
