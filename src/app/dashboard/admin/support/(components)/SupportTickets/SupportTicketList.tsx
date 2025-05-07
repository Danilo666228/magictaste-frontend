'use client'

import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'

import { Typography } from '@/components/ui/common'

import { Account } from '@/shared/api/types'

import { SupportTicketItem } from './SupportTicketItem'

export interface ActiveChat {
	account: Account
	status: 'new' | 'active' | 'finished'
	lastMessage: string
	unreadCount: number
	createdAt: Date
	updatedAt: Date
	assignedAdmin?: Account
}

interface SupportTicketListProps {
	socket: Socket | null
	onTicketSelect: (ticket: Account) => void
	searchQuery: string
}

export function SupportTicketList({ socket, onTicketSelect, searchQuery }: SupportTicketListProps) {
	const [activeChats, setActiveChats] = useState<ActiveChat[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!socket) return

		// Получаем активные чаты при загрузке
		socket.emit('getActiveChats', (response: { success: boolean; chats: ActiveChat[] }) => {
			if (response.success) {
				setActiveChats(response.chats)
			} else {
				setError('Не удалось загрузить активные чаты')
			}
			setIsLoading(false)
		})

		// Слушаем новые запросы чата
		socket.on('newChatRequest', (chat: ActiveChat) => {
			console.log('New chat request received:', chat)
			setActiveChats(prev => {
				// Проверяем, есть ли уже такой чат
				const exists = prev.some(c => c.account.id === chat.account.id)
				if (exists) {
					return prev.map(c => (c.account.id === chat.account.id ? chat : c))
				} else {
					return [chat, ...prev]
				}
			})
		})

		// Слушаем обновления статуса чата
		socket.on('chatStatusUpdated', (updatedChat: ActiveChat) => {
			setActiveChats(prev =>
				prev.map(chat => (chat.account.id === updatedChat.account.id ? updatedChat : chat)).filter(chat => chat.status !== 'finished')
			)
		})

		// Слушаем завершение чата
		socket.on('chatFinished', (userId: string) => {
			setActiveChats(prev => prev.filter(chat => chat.account.id !== userId))
		})

		return () => {
			socket.off('newChatRequest')
			socket.off('chatStatusUpdated')
			socket.off('chatFinished')
		}
	}, [socket])

	// Фильтруем чаты по поисковому запросу
	const filteredChats = activeChats.filter(chat => {
		if (!chat?.account) return false

		const userName = chat.account.userName?.toLowerCase() || ''
		const email = chat.account.email?.toLowerCase() || ''
		const query = searchQuery.toLowerCase()

		return userName.includes(query) || email.includes(query)
	})

	if (isLoading) {
		return <Typography>Загрузка чатов...</Typography>
	}

	if (error) {
		return <Typography className='text-red-500'>Ошибка: {error}</Typography>
	}

	return (
		<div className='flex flex-col gap-4'>
			{filteredChats.length === 0 ? (
				<Typography className='text-center text-muted-foreground'>{searchQuery ? 'Чаты не найдены' : 'Нет активных чатов'}</Typography>
			) : (
				filteredChats.map(chat => (
					<SupportTicketItem
						key={chat.account.id}
						ticket={{
							user: {
								id: chat.account.id,
								userName: chat.account.userName,
								email: chat.account.email,
								picture: chat.account.picture || undefined
							},
							lastMessage: chat.lastMessage,
							unreadCount: chat.unreadCount,
							status: chat.status,
							updatedAt: chat.updatedAt
						}}
						onClick={() => onTicketSelect(chat.account)}
					/>
				))
			)}
		</div>
	)
}
