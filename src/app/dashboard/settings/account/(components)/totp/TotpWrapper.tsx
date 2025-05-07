'use client'

import { ShieldCheck, ShieldX, Smartphone } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, Typography } from '@/components/ui/common'
import { Skeleton } from '@/components/ui/common/Skeleton'

import { useProfile } from '@/hooks/useProfile'

import { DisableTotp } from './DisableTotp'
import { EnableTotp } from './EnableTotp'
import { cn } from '@/lib/utils/twMerge'

export function TotpWrapper() {
	const { profile, isPending } = useProfile()
	const isEnabled = profile?.data.accountSettings.isTwoFactorTotpEnabled

	return isPending ? (
		<WrapperTotpSkeleton />
	) : (
		<Card className='flex h-full flex-col border shadow-sm transition-all hover:shadow-md'>
			<CardHeader className='flex flex-row items-center gap-4 pb-2'>
				<div className={cn('rounded-full p-2', isEnabled ? 'bg-green-600/10' : 'bg-red-600/10')}>
					{isEnabled ? <ShieldCheck className='h-5 w-5 text-green-600' /> : <ShieldX className='h-5 w-5 text-red-600' />}
				</div>
				<div>
					<CardTitle className='text-lg font-medium'>2FA по приложению</CardTitle>
					<CardDescription className='text-xs text-muted-foreground'>
						Используйте приложение аутентификации для генерации кодов
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent className='flex flex-1 flex-col justify-between gap-4 p-4'>
				<div className='mb-2 flex items-center gap-3'>
					<Smartphone className='h-4 w-4 text-muted-foreground' />
					<Typography className='text-sm text-muted-foreground'>Google Authenticator, Authy или другие TOTP-приложения</Typography>
				</div>

				<Typography className='text-sm text-muted-foreground'>
					Включите двухфакторную аутентификацию через мобильное приложение для максимальной защиты вашего аккаунта.
				</Typography>

				<div className='mt-4 flex items-center justify-between border-t pt-3'>
					<Typography className='font-medium'>{isEnabled ? 'Включено' : 'Выключено'}</Typography>
					<div>{isEnabled ? <DisableTotp /> : <EnableTotp />}</div>
				</div>
			</CardContent>
		</Card>
	)
}

export function WrapperTotpSkeleton() {
	return <Skeleton className='h-[200px] w-full rounded-lg' />
}
