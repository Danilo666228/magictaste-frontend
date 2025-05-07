'use client'

import { AnimatePresence, m } from 'framer-motion'
import { AlertTriangle, Bell, CheckCircle, Clock, Filter, Inbox, RefreshCw, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button, Typography } from '@/components/ui/common'

import { useNotificationsWebSocketStore } from '@/store/useNotificationsWebSocketStore'

import { NotificationItem } from './NotificationItem'

export function Notifications() {
	const {
		notifications,
		isLoading,
		error,
		fetchNotifications,
		markAsRead,
		markAllAsRead,
		deleteNotification,
		deleteAllNotifications,
		checkConnection,
		isConnected
	} = useNotificationsWebSocketStore()
	useEffect(() => {
		checkConnection()

		if (isConnected) {
			fetchNotifications()
		}
	}, [checkConnection, fetchNotifications, isConnected])
	const [filter, setFilter] = useState<'all' | 'unread'>('all')

	const filteredNotifications = filter === 'all' ? notifications : notifications.filter(notification => !notification.isRead)
	const unreadCount = notifications.filter(notification => !notification.isRead).length

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
				<div className='flex items-center gap-4'>
					<div className='relative'>
						<div className='rounded-xl p-2 border'>
							<Bell size={32} />
						</div>
						{!!unreadCount && (
							<m.span
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								className='absolute -right-1 -top-1 flex h-5 w-5 scale-100 items-center justify-center rounded-full bg-primary text-xs font-medium text-background'>
								{unreadCount}
							</m.span>
						)}
					</div>
					<div>
						<Typography tag='h1' className='text-2xl font-bold'>
							Уведомления
						</Typography>
						<Typography tag='p' className='text-sm'>
							{unreadCount ? `У вас ${unreadCount} непрочитанных уведомлений` : 'Нет новых уведомлений'}
						</Typography>
					</div>
				</div>

				<div className='flex flex-wrap items-center gap-2'>
					<div className='flex gap-3 rounded-lg border p-1 shadow-sm'>
						<Button
							variant='outline'
							onClick={() => setFilter('all')}
							className='rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary'>
							<Inbox className='h-4 w-4' />
							Все
						</Button>
						<Button
							onClick={() => setFilter('unread')}
							variant='outline'
							className='rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary'>
							<Filter className='h-4 w-4' />
							Непрочитанные
						</Button>
						<Button
							onClick={fetchNotifications}
							variant='outline'
							className='inline-flex items-center text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary'>
							<RefreshCw className='h-4 w-4' />
							Обновить
						</Button>
					</div>
				</div>
			</div>

			{error && (
				<m.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className='mb-4 rounded-md border border-red-200 bg-red-50 p-4 text-red-700'>
					<p className='flex items-center gap-2'>
						<AlertTriangle className='h-5 w-5' />
						{error}
					</p>
				</m.div>
			)}

			{notifications.length > 0 && (
				<div className='mb-6 flex flex-wrap justify-end gap-2'>
					<Button
						variant='outline'
						onClick={markAllAsRead}
						className='items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary'>
						<CheckCircle size={16} />
						Отметить все как прочитанные
					</Button>
					<Button
						variant='outline'
						onClick={deleteAllNotifications}
						className='items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors hover:text-red-700'>
						<Trash2 size={16} />
						Удалить все
					</Button>
				</div>
			)}

			{isLoading ? (
				<div className='flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 p-12 text-center'>
					<div className='mb-4 rounded-full p-3 shadow-lg'>
						<Clock size={28} className='animate-spin text-primary' />
					</div>
					<Typography tag='h3' className='mb-2 text-lg font-medium'>
						Загрузка уведомлений ...
					</Typography>
					<Typography tag='p' className='text-sm text-muted-foreground'>
						Пожалуйста, подождите
					</Typography>
				</div>
			) : !filteredNotifications.length ? (
				<div className='flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 p-12 text-center'>
					<div className='mb-4 rounded-full bg-background p-3 shadow-md'>
						<Bell className='text-primary' size={32} />
					</div>
					<Typography tag='h3' className='mb-2 text-lg font-medium'>{filter === 'all' ? 'Нет уведомлений' : 'Нет непрочитанных уведомлений'}</Typography>
					<p className='max-w-md text-sm text-gray-500'>
						{filter === 'all'
							? 'У вас пока нет новых уведомлений. Они появятся здесь, когда что-то произойдет.'
							: 'У вас нет непрочитанных уведомлений. Переключитесь на "Все", чтобы увидеть историю.'}
					</p>
				</div>
			) : (
				<div className='space-y-3'>
					<AnimatePresence mode='popLayout'>
						{filteredNotifications.map((notification, index) => (
							<m.div
								key={notification.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.2, delay: index * 0.05 }}>
								<NotificationItem notification={notification} onMarkAsRead={markAsRead} onDelete={deleteNotification} />
							</m.div>
						))}
					</AnimatePresence>
				</div>
			)}
		</div>
	)
}
