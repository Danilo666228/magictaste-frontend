'use client'

import { useFormatter } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'

import { Avatar, AvatarFallback, AvatarImage, Button, Textarea, Typography } from '@/components/ui/common'

import { useProfile } from '@/hooks/useProfile'

import { Account } from '@/shared/api/types'
import { Message } from '@/shared/api/types/supportChat'

import { getMediaSource } from '@/lib/utils'
import { cn } from '@/lib/utils/twMerge'

interface SupportTicketChatProps {
	socket: Socket | null
	selectedTicket: Account
	onClose: () => void
}

export function SupportTicketChat({ socket, selectedTicket, onClose }: SupportTicketChatProps) {
	const [messages, setMessages] = useState<Message[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [isSending, setIsSending] = useState(false)
	const [newMessage, setNewMessage] = useState('')
	const { profile } = useProfile()
	const formatter = useFormatter()
	const messagesEndRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!socket || !selectedTicket || !profile?.data) return

		setIsLoading(true)

		// Загружаем историю сообщений
		socket.emit('getChatHistory', { userId: selectedTicket.id }, (response: { success: boolean; history: Message[] }) => {
			if (response.success && Array.isArray(response.history)) {
				setMessages(response.history)
			} else {
				console.error('Failed to load chat history:', response)
			}
			setIsLoading(false)

			// Прокручиваем к последнему сообщению
			setTimeout(() => {
				messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
			}, 100)
		})

		// Слушаем новые сообщения
		const handleNewMessage = (message: Message) => {
			// Проверяем, относится ли сообщение к текущему чату
			if (message.senderId === selectedTicket.id || message.receiverId === selectedTicket.id) {
				setMessages(prev => [...prev, message])
				messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
			}
		}

		socket.on('newMessage', handleNewMessage)

		return () => {
			socket.off('newMessage', handleNewMessage)
		}
	}, [socket, selectedTicket, profile?.data])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!socket || !newMessage.trim() || !profile?.data || isSending) return

		try {
			setIsSending(true)

			const messageData = {
				content: newMessage.trim(),
				sender: profile.data,
				receiver: selectedTicket,
				createdAt: new Date(),
				updatedAt: new Date()
			}

			// Отправляем сообщение через сокет
			socket.emit('sendMessage', messageData, (response: { success: boolean; message: Message }) => {
				if (response.success) {
					setMessages(prev => [...prev, response.message])
					setNewMessage('')
					messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
				} else {
					console.error('Failed to send message')
				}
				setIsSending(false)
			})
		} catch (error) {
			console.error('Error sending message:', error)
			setIsSending(false)
		}
	}

	const handleFinishChat = () => {
		if (!socket || !selectedTicket.id) return

		socket.emit('finishChat', { userId: selectedTicket.id }, (response: { success: boolean }) => {
			if (response.success) {
				console.log('Chat finished successfully')
				onClose() // Закрываем чат
			} else {
				console.error('Failed to finish chat')
			}
		})
	}

	return (
		<div className='flex h-full flex-col'>
			{/* Header */}
			<div className='flex items-start justify-between gap-3 border-b p-5'>
				<div className='flex items-start gap-3'>
					<Avatar>
						<AvatarImage src={getMediaSource(selectedTicket.picture)} />
						<AvatarFallback>{selectedTicket.userName.slice(0, 2)}</AvatarFallback>
					</Avatar>
					<div className='flex flex-col gap-1'>
						<Typography tag='span' className='text-sm font-semibold'>
							{selectedTicket.userName}
						</Typography>
						{selectedTicket.email && (
							<Typography tag='span' className='text-xs text-muted-foreground'>
								{selectedTicket.email}
							</Typography>
						)}
					</div>
				</div>
				<div className='flex gap-2'>
					<Button variant='destructive' size='sm' onClick={handleFinishChat}>
						Завершить чат
					</Button>
					<Button variant='ghost' size='icon' onClick={onClose}>
						✕
					</Button>
				</div>
			</div>

			{/* Messages */}
			<div className='flex-grow overflow-y-auto p-5'>
				{isLoading ? (
					<div className='flex justify-center'>
						<Typography>Загрузка сообщений...</Typography>
					</div>
				) : messages.length === 0 ? (
					<div className='flex h-full items-center justify-center'>
						<Typography className='text-muted-foreground'>Нет сообщений. Начните диалог с пользователем.</Typography>
					</div>
				) : (
					messages.map((message, index) => (
						<div
							key={message.id || index}
							className={cn(
								'mb-2 flex flex-wrap items-start gap-2',
								message.senderId === profile?.data.id ? 'flex-row-reverse' : 'flex-row'
							)}>
							{message.senderId === profile?.data.id ? (
								<Avatar className='flex-shrink-0'>
									<AvatarImage src={getMediaSource(profile.data.picture)} />
									<AvatarFallback>{profile.data.userName.slice(0, 2)}</AvatarFallback>
								</Avatar>
							) : (
								<Avatar className='flex-shrink-0'>
									<AvatarImage src={getMediaSource(selectedTicket.picture)} />
									<AvatarFallback>{selectedTicket.userName.slice(0, 2)}</AvatarFallback>
								</Avatar>
							)}
							<div className={cn('flex max-w-[75%] flex-col', message.senderId === profile?.data.id ? 'items-end' : 'items-start')}>
								<div
									className={cn(
										'w-fit max-w-full break-words rounded-t-2xl p-2 text-sm',
										message.senderId === profile?.data.id ? 'rounded-bl-2xl bg-blue-100' : 'rounded-br-2xl bg-gray-200'
									)}>
									{message.message}
								</div>
								<div className='mt-0.5 text-xs text-gray-500'>{formatter.dateTime(new Date(message.createdAt))}</div>
							</div>
						</div>
					))
				)}
				<div ref={messagesEndRef} />
			</div>

			{/* Input */}
			<form onSubmit={handleSubmit} className='flex flex-col items-center gap-4 border-t p-5'>
				<div className='flex w-full items-center gap-2'>
					<Textarea
						className='w-full'
						placeholder='Введите сообщение...'
						value={newMessage}
						onChange={e => setNewMessage(e.target.value)}
						disabled={isSending}
					/>
				</div>
				<Button type='submit' disabled={!newMessage.trim() || isSending} className='ml-auto'>
					{isSending ? 'Отправка...' : 'Отправить'}
				</Button>
			</form>
		</div>
	)
}
