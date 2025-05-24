'use client'

import { MessageCircle } from 'lucide-react'
import { useFormatter } from 'next-intl'
import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'

import { useProfile } from '@/hooks/useProfile'

import { SERVER_URL, SOCKET_SUPPORT_CHAT_URL } from '@/lib/constants/url.constants'
import { getMediaSource } from '@/lib/utils'
import { checkAccessRoles } from '@/lib/utils/accessRoles'
import { cn } from '@/lib/utils/twMerge'

import { Account } from '@/shared/api/types'

import { Avatar, AvatarFallback, AvatarImage, Button, Input } from '../../common'
import { Typography } from '../../common/Typography'

import { ExpandableChat, ExpandableChatBody, ExpandableChatFooter, ExpandableChatHeader } from './ExpandableChat'

interface Message {
	id: string
	message: string
	senderId: string
	sender: Account
	receiverId?: string
	receiver?: Account
	createdAt: Date
	updatedAt: Date
}

export function SupportChat() {
	const { profile } = useProfile()
	const formatter = useFormatter()
	const [messages, setMessages] = useState<Message[]>([])
	const [message, setMessage] = useState('')
	const [support, setSupport] = useState<Account | null>(null)
	const [isConnected, setIsConnected] = useState(false)
	const [socket, setSocket] = useState<Socket | null>(null)
	const [chatStarted, setChatStarted] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (!profile?.data?.id) return

		const socketInstance = io(SERVER_URL, {
			path: SOCKET_SUPPORT_CHAT_URL,
			auth: { userId: profile.data.id },
			withCredentials: true,
			transports: ['websocket']
		})

		setSocket(socketInstance)

		socketInstance.on('connect', () => {
			console.log('Connected to support socket')
			setIsConnected(true)
			setIsLoading(false)
		})

		socketInstance.on('disconnect', () => {
			setIsConnected(false)
		})

		socketInstance.on('newMessage', (newMessage: Message) => {
			setMessages(prev => [...prev, newMessage])
		})

		socketInstance.on('supportAssigned', (data: { support: Account }) => {
			console.log('Support assigned:', data)
			setSupport(data.support)
		})

		socketInstance.on('chatFinished', handleChatEnd('Чат завершен. Вы можете запросить поддержку снова.'))
		socketInstance.on('chatClosed', handleChatEnd('Чат был закрыт администратором. Вы можете запросить поддержку снова.'))

		socketInstance.emit('getUserChat', { userId: profile.data.id }, handleChatResponse)

		socketInstance.emit('getChatHistory', { userId: profile.data.id }, handleChatHistoryResponse)

		return () => {
			socketInstance.disconnect()
		}
	}, [profile?.data?.id])

	const handleChatEnd = (messageText: string) => () => {
		setSupport(null)
		setChatStarted(false)

		const systemMessage: Message = {
			id: uuidv4(),
			message: messageText,
			senderId: 'system',
			sender: { id: 'system', userName: 'Система' } as Account,
			createdAt: new Date(),
			updatedAt: new Date()
		}
		setMessages(prev => [...prev, systemMessage])
	}

	const handleChatResponse = (response: { success: boolean; chat?: { status: string; assignedAdmin?: Account } }) => {
		if (response.success && response.chat) {
			const { status, assignedAdmin } = response.chat
			setChatStarted(status === 'ACTIVE' || status === 'WAITING')
			if (assignedAdmin) setSupport(assignedAdmin)
		}
		setIsLoading(false)
	}

	const handleChatHistoryResponse = (response: { success: boolean; history: Message[]; chatStatus?: string }) => {
		if (response.success) {
			setMessages(response.history)
			const isChatActive = response.chatStatus === 'ACTIVE' || response.chatStatus === 'WAITING'
			setChatStarted(isChatActive)
			if (!isChatActive) {
				setSupport(null)
			} else {
				const lastAdminMessage = response.history.reverse().find(msg => {
					return msg.sender.roles?.some(role => role.name === 'ADMIN' || role.name === 'SUPER_ADMIN' || role.name === 'SUPPORT')
				})
				if (lastAdminMessage) {
					setSupport(lastAdminMessage.sender)
				}
			}
		}
		setIsLoading(false)
	}

	const requestSupport = () => {
		if (!socket || !isConnected || !profile?.data?.id) return

		setIsLoading(true)
		socket.emit('startChat', { userId: profile.data.id }, (response: { success: boolean; chat: any }) => {
			setIsLoading(false)
			if (response.success) {
				setChatStarted(true)
				console.log('Chat started:', response.chat)
			}
		})
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!message.trim() || !socket || !isConnected || !profile?.data?.id) return

		const messageId = uuidv4()
		const messageData = {
			content: message,
			sender: profile.data,
			receiver: support || { id: 'support' },
			createdAt: new Date(),
			updatedAt: new Date()
		}

		const localMessage: Message = {
			id: messageId,
			message: message,
			senderId: profile.data.id,
			sender: profile.data,
			receiverId: support?.id || 'support',
			createdAt: new Date(),
			updatedAt: new Date()
		}

		setMessages(prev => [...prev, localMessage])
		setMessage('')

		socket.emit('sendMessage', messageData, (response: { success: boolean; message: Message }) => {})
	}

	if (!profile?.data) {
		return (
			<ExpandableChat icon={<MessageCircle />}>
				<ExpandableChatBody>
					<Typography className="flex h-full items-center justify-center text-gray-500">Необходима
						авторизация</Typography>
				</ExpandableChatBody>
			</ExpandableChat>
		)
	}

	if (
		checkAccessRoles(
			profile.data.roles.map(role => role.name),
			['SUPER_ADMIN']
		)
	)
		return null

	return (
		<ExpandableChat icon={<MessageCircle className='text-white' />}>
			<ExpandableChatHeader className='bg-primary text-white'>
				{support ? (
					<div className="flex items-center gap-3">
						<Avatar className="h-8 w-8 border-2 border-white/30">
							<AvatarFallback
								className="bg-blue-400 text-white">{support.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
						</Avatar>
						<div className='flex flex-col'>
							<Typography className='font-medium'>{support.userName}</Typography>
							<Typography className='text-blue-100'>Менеджер поддержки</Typography>
						</div>
					</div>
				) : chatStarted ? (
					<div className="flex items-center gap-3">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-400/30">
							<div className="h-3 w-3 animate-pulse rounded-full bg-blue-200" />
						</div>
						<div className='flex flex-col'>
							<Typography className='font-medium'>Ожидание подключения</Typography>
							<Typography className='text-blue-100'>Менеджер скоро присоединится</Typography>
						</div>
					</div>
				) : (
					<div className="flex w-full items-center justify-between">
						<Typography className="font-medium">Чат поддержки</Typography>
						<button
							onClick={requestSupport}
							disabled={!isConnected || isLoading}
							className='rounded-full bg-white px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-blue-50 disabled:bg-blue-100 disabled:text-blue-400'>
							{isLoading ? 'Загрузка...' : 'Запросить поддержку'}
						</button>
					</div>
				)}
			</ExpandableChatHeader>

			<ExpandableChatBody className="bg-gray-50">
				{isLoading ? (
					<div className='flex h-full flex-col items-center justify-center gap-3 text-gray-500'>
						<div className='h-8 w-8 animate-spin rounded-full border-4 border-primary'></div>
						<Typography>Загрузка сообщений...</Typography>
					</div>
				) : messages.length === 0 && !chatStarted ? (
					<div className='flex h-full flex-col items-center justify-center gap-4 p-6 text-center'>
						<div className='rounded-full bg-blue-100 p-4'>
							<MessageCircle className='h-10 w-10 text-primary' />
						</div>
						<Typography className="font-medium text-gray-800">Добро пожаловать в чат поддержки</Typography>
						<Typography className="text-gray-500">Нажмите "Запросить поддержку", чтобы начать общение с
							менеджером</Typography>
					</div>
				) : (
					<div className="flex flex-col space-y-4 p-4">
						{messages.map(msg => (
							<div
								key={msg.id}
								className={cn(
									'flex items-start gap-2',
									msg.senderId === 'system' ? 'justify-center' : msg.senderId === profile.data.id ? 'flex-row-reverse' : 'flex-row'
								)}>
								{msg.senderId === 'system' ? (
									<div className='my-2 rounded-lg bg-gray-100 px-4 py-2 text-center text-sm text-gray-600'>{msg.message}</div>
								) : (
									<>
										<Avatar
											className={cn(
												'flex-shrink-0 border',
												msg.senderId === profile.data.id ? 'border-blue-200' : 'border-indigo-200 bg-indigo-100'
											)}>
											<AvatarImage
												src={
													msg.senderId === profile.data.id
														? getMediaSource(profile.data?.picture)
														: getMediaSource(support?.picture)
												}
											/>
											<AvatarFallback className="bg-indigo-600 text-white">
												{msg.sender?.userName?.slice(0, 2).toUpperCase()}
											</AvatarFallback>
										</Avatar>
										<div
											className={cn(
												'flex max-w-[75%] flex-col text-sm',
												msg.senderId === profile.data.id ? 'items-end' : 'items-start'
											)}>
											<div
												className={cn(
													'w-fit max-w-full break-words rounded-2xl p-3 shadow-sm',
													msg.senderId === profile.data.id
														? 'rounded-tr-none bg-blue-600 text-white'
														: 'rounded-tl-none bg-white text-gray-800'
												)}>
												{msg.message}
											</div>
											<div className="mt-1 text-xs text-gray-500">
												{formatter.dateTime(new Date(msg.createdAt), { hour: 'numeric', minute: 'numeric' })}
											</div>
										</div>
									</>
								)}
							</div>
						))}
					</div>
				)}
			</ExpandableChatBody>

			<ExpandableChatFooter className='bg-background'>
				<form onSubmit={handleSubmit} className='w-full'>
					<div className='flex items-center gap-2'>
						<Input
							type='text'
							value={message}
							onChange={e => setMessage(e.target.value)}
							className='flex-1 border border-gray-300 bg-gray-50 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
							placeholder='Введите сообщение...'
							disabled={!support}
						/>
						<Button
							type='submit'
							disabled={!support || !message}
							className=' bg-blue-600 px-4 py-2.5 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-300'>
							Отправить
						</Button>
					</div>
				</form>
			</ExpandableChatFooter>
		</ExpandableChat>
	)
}
