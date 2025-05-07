'use client'

import { useFormatter } from 'next-intl'

import { Avatar, AvatarFallback, AvatarImage, Badge, Typography } from '@/components/ui/common'

import { getMediaSource } from '@/lib/utils'
import { cn } from '@/lib/utils/twMerge'

interface SupportTicketItemProps {
	ticket: {
		user: {
			id: string
			userName: string
			email?: string
			picture?: string
		}
		lastMessage: string | null
		unreadCount: number
		status: 'new' | 'active' | 'finished'
		updatedAt?: Date
	}
	onClick: () => void
}

export function SupportTicketItem({ ticket, onClick }: SupportTicketItemProps) {
	const formatter = useFormatter()

	// Определяем цвет и текст статуса
	const statusConfig = {
		new: { color: 'bg-red-100 text-red-800', text: 'Новый' },
		active: { color: 'bg-green-100 text-green-800', text: 'Активный' },
		finished: { color: 'bg-gray-100 text-gray-800', text: 'Завершен' }
	}

	const status = statusConfig[ticket.status]

	return (
		<div
			onClick={onClick}
			className={cn(
				'flex cursor-pointer flex-col gap-3 rounded-lg border p-3 transition-all hover:bg-muted/80',
				ticket.status === 'new' && 'border-red-200 bg-red-50',
				ticket.unreadCount > 0 && 'border-blue-200 bg-blue-50'
			)}>
			<div className='flex items-start justify-between'>
				<div className='flex items-center gap-2'>
					<Avatar className='h-8 w-8'>
						<AvatarImage src={getMediaSource(ticket.user.picture)} />
						<AvatarFallback>{ticket.user.userName.slice(0, 2)}</AvatarFallback>
					</Avatar>
					<div>
						<Typography className='font-medium'>{ticket.user.userName}</Typography>
						{ticket.user.email && <Typography className='text-xs text-muted-foreground'>{ticket.user.email}</Typography>}
					</div>
				</div>
				<div className='flex flex-col items-end gap-1'>
					<Badge variant='outline' className={status.color}>
						{status.text}
					</Badge>
					{ticket.updatedAt && (
						<Typography className='text-xs text-muted-foreground'>
							{formatter.dateTime(new Date(ticket.updatedAt), {
								hour: 'numeric',
								minute: 'numeric'
							})}
						</Typography>
					)}
				</div>
			</div>

			<div className='flex items-center justify-between'>
				{ticket.lastMessage ? (
					<Typography className='line-clamp-1 text-sm text-muted-foreground'>{ticket.lastMessage}</Typography>
				) : (
					<Typography className='text-sm italic text-muted-foreground'>Нет сообщений</Typography>
				)}

				{ticket.unreadCount > 0 && <Badge className='ml-2 bg-blue-500'>{ticket.unreadCount}</Badge>}
			</div>
		</div>
	)
}
