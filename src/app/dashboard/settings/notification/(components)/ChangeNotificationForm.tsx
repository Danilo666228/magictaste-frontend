'use client'

import { Bell, BellOff, LucideIcon, MessageSquare } from 'lucide-react'

import { useChangeNotificationForm } from '@/app/dashboard/settings/(hooks)/useChangeNotificationForm'

import {
	Badge,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Form,
	FormField,
	Label,
	Typography
} from '@/components/ui/common'
import { Switch } from '@/components/ui/common/Switch'

import { cn } from '@/lib/utils'

function NotificationToggle({
	icon: Icon,
	className,
	title,
	description,
	value,
	onChange,
	disabled,
	iconColor = 'text-primary'
}: {
	icon: LucideIcon
	className?: string
	title: string
	description: string
	value: boolean
	onChange: (value: boolean) => void
	disabled?: boolean
	iconColor?: string
}) {
	return (
		<div
			className={cn('flex w-full items-center justify-between gap-4 rounded-lg border p-4 transition-all hover:bg-muted/10', className)}>
			<div className='flex items-start gap-3'>
				<div className={`rounded-full p-2 ${value ? 'bg-primary/10' : 'bg-muted/30'}`}>
					<Icon size={18} className={value ? iconColor : 'text-muted-foreground'} />
				</div>
				<Label htmlFor={`toggle-${title}`} className='flex cursor-pointer flex-col gap-1'>
					<span className='font-medium'>{title}</span>
					<span className='text-sm text-muted-foreground'>{description}</span>
				</Label>
			</div>
			<Switch
				id={`toggle-${title}`}
				checked={value}
				onCheckedChange={onChange}
				disabled={disabled}
				className={value ? 'data-[state=checked]:bg-primary' : ''}
			/>
		</div>
	)
}

export function ChangeNotificationForm() {
	const { form, isPending, onChange } = useChangeNotificationForm()

	return (
		<Form {...form}>
			<Card className='border shadow-sm'>
				<CardHeader className='bg-muted/30 pb-4'>
					<div className='flex items-center gap-3'>
						<div className='rounded-full bg-primary/10 p-2'>
							<Bell className='h-5 w-5 text-primary' />
						</div>
						<div>
							<CardTitle className='text-xl font-medium'>Настройки уведомлений</CardTitle>
							<CardDescription>Управление способами получения уведомлений</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className='flex flex-col gap-4 p-6'>
					<div className='rounded-lg bg-muted/20 p-3'>
						<Typography className='text-sm text-muted-foreground'>
							Настройте, как и когда вы хотите получать уведомления о важных событиях в системе.
						</Typography>
					</div>

					<div className='space-y-3 pt-2'>
						<FormField
							control={form.control}
							name='siteNotifications'
							render={({ field }) => (
								<NotificationToggle
									className=''
									icon={field.value ? Bell : BellOff}
									title='Уведомления на сайте'
									description='Получать уведомления о новых заказах, событиях и мероприятиях'
									value={field.value}
									onChange={value => onChange('siteNotifications', value)}
									disabled={isPending}
									iconColor='text-green-600'
								/>
							)}
						/>
						<div className='relative'>
							<FormField
								control={form.control}
								name='telegramNotifications'
								render={({ field }) => (
									<NotificationToggle
										className=''
										icon={field.value ? MessageSquare : BellOff}
										title='Уведомления в Telegram'
										description='Получать уведомления в Telegram о важных событиях и обновлениях'
										value={field.value}
										onChange={value => onChange('telegramNotifications', value)}
										disabled={isPending}
										iconColor='text-green-600'
									/>
								)}
							/>
							<Badge className='absolute -top-2 -left-2 font-semibold' variant={'default'}>Beta</Badge>
						</div>
					</div>

					<div className='mt-2 rounded-lg border border-primary/20 bg-primary/10 p-3'>
						<Typography className='text-sm'>
							Обратите внимание: отключение всех уведомлений может привести к пропуску важных событий и обновлений в системе.
						</Typography>
					</div>
				</CardContent>
			</Card>
		</Form>
	)
}
