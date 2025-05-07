'use client'

import { CheckCircle2, Loader2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import {
	Alert,
	AlertDescription,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Typography
} from '@/components/ui/common'

import { useVerificationAccount } from '../(hooks)/useVerificationAccount'

import { ROUTE } from '@/config/route.config'

export function VerificationAccount({ token }: { token: string }) {
	const { isPending, isSuccess } = useVerificationAccount(token)
	const [showAnimation, setShowAnimation] = useState(true)

	// useEffect(() => {
	// 	if (!isPending) {
	// 		const timer = setTimeout(() => setShowAnimation(false), 1000)
	// 		return () => clearTimeout(timer)
	// 	}
	// }, [isPending])

	return (
		<Card className='w-full max-w-md shadow-lg'>
			<CardHeader className='space-y-2 text-center'>
				<CardTitle className='text-2xl font-bold'>Верификация аккаунта</CardTitle>
				<CardDescription>
					{isPending
						? 'Подтверждаем вашу учетную запись...'
						: isSuccess
							? 'Ваш аккаунт успешно подтвержден!'
							: 'Не удалось подтвердить аккаунт'}
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col items-center justify-center space-y-6 pb-8 pt-4'>
				{isPending || showAnimation ? (
					<div className='flex flex-col items-center space-y-4'>
						<Loader2 className='h-16 w-16 animate-spin text-primary' />
						<Typography tag='p' className='text-muted-foreground'>
							Пожалуйста, подождите...
						</Typography>
					</div>
				) : isSuccess ? (
					<div className='flex flex-col items-center space-y-4'>
						<CheckCircle2 className='h-16 w-16 text-green-500' />
						<Alert variant='default' className='border-green-200 bg-green-50 dark:bg-green-950/30'>
							<AlertDescription>Ваша учетная запись успешно подтверждена. Теперь вы можете войти в систему.</AlertDescription>
						</Alert>
						<Button asChild className='mt-4 w-full'>
							<Link href={ROUTE.auth.signIn}>Войти в аккаунт</Link>
						</Button>
					</div>
				) : (
					<div className='flex flex-col items-center space-y-4'>
						<XCircle className='h-16 w-16 text-destructive' />
						<Alert variant='destructive'>
							<AlertDescription>
								Произошла ошибка при подтверждении вашей учетной записи. Возможно, ссылка недействительна или срок ее действия
								истек.
							</AlertDescription>
						</Alert>
						<Button asChild variant='outline' className='mt-4 w-full'>
							<Link href={ROUTE.auth.signUp}>Зарегистрироваться заново</Link>
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
