import { LockKeyhole } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/common'

import { ChangeTwoFactorEmail } from './ChangeTwoFactorEmail'
import { TotpWrapper } from './totp/TotpWrapper'

export function TwoFactorSettings() {
	return (
		<Card className='rounded-lg'>
			<CardHeader className='bg-muted/50'>
				<div className='flex items-center gap-3'>
					<div className='rounded-full bg-primary/10 p-2'>
						<LockKeyhole className='h-5 w-5 text-primary' />
					</div>
					<div>
						<CardTitle className='text-xl'>Двухфакторная аутентификация</CardTitle>
						<CardDescription>Настройте дополнительный уровень защиты для вашего аккаунта</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className='p-6'>
				<div className='grid grid-cols-1 gap-6'>
					<ChangeTwoFactorEmail />
					<TotpWrapper />
				</div>
			</CardContent>
		</Card>
	)
}
