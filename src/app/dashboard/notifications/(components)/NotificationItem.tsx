import { motion } from 'framer-motion'
import { Bell, CheckCheck, Clock, ExternalLink, Trash } from 'lucide-react'
import { useFormatter } from 'next-intl'

import { Button, Typography } from '@/components/ui/common'

import { Notification } from '@/shared/api/types'

interface NotificationProps {
	notification: Notification
	onMarkAsRead: (id: string) => void
	onDelete: (id: string) => void
}

export function NotificationItem({ notification, onMarkAsRead, onDelete }: NotificationProps) {
	const formatter = useFormatter()

	const createdAt = notification.createdAt

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, x: -10 }}
			transition={{ duration: 0.2 }}
			className='group rounded-xl border'>
			<div className='flex p-5'>
				<div className='relative mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border'>
					<Bell />
				</div>

				<div className='flex-1 space-y-3'>
					<div className='flex items-start justify-between gap-x-3'>
						<Typography tag='h3' className='font-semibold group-hover:text-primary'>
							{notification.title}
						</Typography>
						<span className='flex items-center gap-1 whitespace-nowrap text-xs text-muted-foreground'>
							<Clock size={12} />
							{formatter.relativeTime(createdAt, new Date())}
						</span>
					</div>

					<Typography className='text-sm leading-relaxed'>{notification.message}</Typography>

					<div className='flex items-center justify-between pt-1'>
						{notification.link ? (
							<a
								href={notification.link}
								className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 hover:opacity-70`}>
								<span>Подробнее</span>
								<ExternalLink className='h-3.5 w-3.5' />
							</a>
						) : (
							<div />
						)}
						<div className='flex items-center gap-2'>
							<Button
								onClick={() => onDelete(notification.id)}
								variant='outline'
								className='items-center gap-1.5 hover:text-red-700'>
								<Trash className='' size={14} />
								<Typography tag='span'>Удалить</Typography>
							</Button>
							{!notification.isRead && (
								<Button variant='outline' onClick={() => onMarkAsRead(notification.id)} className='items-center gap-1.5'>
									<CheckCheck size={14} />
									<Typography tag='span'>Отметить как прочитанное</Typography>
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	)
}
