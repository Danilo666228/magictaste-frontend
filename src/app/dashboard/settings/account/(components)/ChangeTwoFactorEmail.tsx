'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, Switch, Typography } from '@/components/ui/common'
import { useChangeTwoFactorEmailMutation } from '@/shared/api/hooks/profile/useChangeTwoFactorEmailMutation'
import { useProfile } from '@/shared/utils/contexts'
import { useQueryClient } from '@tanstack/react-query'
import { Mail, ShieldCheck, ShieldX } from 'lucide-react'

export function ChangeTwoFactorEmail() {
	const queryClient = useQueryClient()
	const { profile } = useProfile()
	const { mutate: updateTwoFactorEmail, isPending } = useChangeTwoFactorEmailMutation({
		options: {
			onSettled: () => queryClient.invalidateQueries({ queryKey: ['getProfile'] })
		}
	})

	const isEnabled = profile?.accountSettings.isTwoFactorEmailEnabled

	return (
		<Card className='flex h-full flex-col border shadow-sm transition-shadow duration-300 hover:shadow-md'>
			<CardHeader className='flex flex-row items-center gap-4 pb-2'>
				<div className={`rounded-full p-2 ${isEnabled ? 'bg-green-600/10' : 'bg-red-600/10'}`}>
					{isEnabled ? <ShieldCheck className='h-5 w-5 text-green-600' /> : <ShieldX className='h-5 w-5 text-red-600' />}
				</div>
				<div>
					<CardTitle className='text-lg font-medium'>2FA по почте</CardTitle>
					<CardDescription className='text-xs text-muted-foreground'>Код подтверждения будет отправлен на вашу почту</CardDescription>
				</div>
			</CardHeader>
			<CardContent className='flex flex-1 flex-col justify-between gap-4 p-4'>
				<div className='mb-2 flex items-center gap-3'>
					<Mail className='h-4 w-4 text-muted-foreground' />
					<Typography className='text-sm text-muted-foreground'>{profile?.email || 'your@email.com'}</Typography>
				</div>

				<Typography className='text-sm text-muted-foreground'>
					Включите 2FA по почте, чтобы добавить дополнительный уровень безопасности к вашему аккаунту.
				</Typography>

				<div className='mt-4 flex items-center justify-between border-t pt-3'>
					<Typography className='font-medium'>{isEnabled ? 'Включено' : 'Выключено'}</Typography>
					<Switch
						disabled={isPending}
						checked={isEnabled}
						onCheckedChange={() =>
							updateTwoFactorEmail({ params: { isTwoFactorEmailEnabled: !profile?.accountSettings.isTwoFactorEmailEnabled } })
						}
						className='data-[state=checked]:bg-primary'
					/>
				</div>
			</CardContent>
		</Card>
	)
}
