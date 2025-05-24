import { Bell, Check, CheckCheck } from 'lucide-react'
import { useFormatter } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo } from 'react'

import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components/ui/common'

import { cn } from '@/lib/utils/twMerge'

import { useNotificationsWebSocketStore } from '@/store/useNotificationsWebSocketStore'

import { ROUTE } from '@/config/route.config'

export function Notifications() {
	const { notifications, markAllAsRead, checkConnection, isConnected, fetchNotifications, markAsRead } = useNotificationsWebSocketStore()
	const router = useRouter()
	const formatter = useFormatter()

	const unreadCount = useMemo(() => notifications.filter(notification => !notification.isRead).length, [notifications])

	useEffect(() => {
		checkConnection()
	}, [checkConnection])

	useEffect(() => {
		if (isConnected) {
			fetchNotifications()
		}
	}, [isConnected, fetchNotifications])

	const handleViewAll = useCallback(() => {
		router.push(ROUTE.dashboard.notifications)
	}, [router])

	const handleMarkAsRead = (id: string) => markAsRead(id)

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='ghost' size='icon' className='relative h-10 w-10 border'>
					<Bell />
					{unreadCount > 0 && (
						<span className='absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-background'>
							{unreadCount}
						</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='p-0' align='center'>
				<div className='flex flex-col'>
					<div className='border-b p-4'>
						<div className='flex items-center justify-between gap-4'>
							<h4 className='font-medium'>Уведомления</h4>
							<Button onClick={markAllAsRead} variant='ghost' size='sm' className='text-xs text-muted-foreground'>
								Отметить все как прочитанные
							</Button>
						</div>
					</div>
					<div className='max-h-[300px] overflow-y-auto'>
						{notifications.length > 0 ? (
							notifications.map((notification, index, array) => (
								<Link href={notification.link} key={notification.id}>
									<div
										className={cn(
											'flex cursor-pointer flex-col gap-2 p-4 transition-colors hover:bg-muted/50',
											!notification.isRead && 'bg-muted/20',
											index !== array.length - 1 && 'border-b'
										)}>
										<div className='flex items-center gap-4'>
											{!notification.isRead && <div className='h-2 w-2 rounded-full bg-blue-600' />}
											<span className='text-sm font-medium'>{notification.title}</span>
										</div>
										<p className='text-xs text-muted-foreground'>{notification.message}</p>
										<div className='flex items-center justify-between'>
											<Button
												onClick={e => {
													e.preventDefault()
													handleMarkAsRead(notification.id)
												}}
												variant='ghost'
												size='icon'
												className='h-fit w-fit text-xs text-muted-foreground'>
												{notification.isRead ? <CheckCheck /> : <Check />}
												Отметить как прочитаное
											</Button>
											<span className='text-xs text-muted-foreground'>
												{formatter.dateTime(new Date(notification.createdAt))}
											</span>
										</div>
									</div>
								</Link>
							))
						) : (
							<div className='flex h-full items-center justify-center p-4'>
								<p className='text-sm text-muted-foreground'>Уведомлений нет</p>
							</div>
						)}
					</div>
					<div className='border-t p-4'>
						<Button onClick={handleViewAll} variant='outline' className='w-full' size='sm'>
							Посмотреть все уведомления
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
