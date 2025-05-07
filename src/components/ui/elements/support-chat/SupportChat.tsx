'use client'

import { CircleUser, MessageCircle } from 'lucide-react'
import { useFormatter } from 'next-intl'
import { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'

import { useProfile } from '@/hooks/useProfile'

import { Account } from '@/shared/api/types'

import { Avatar, AvatarFallback, AvatarImage } from '../../common'
import { Typography } from '../../common/Typography'

import { ExpandableChat, ExpandableChatBody, ExpandableChatFooter, ExpandableChatHeader } from './ExpandableChat'
import { SERVER_URL, SOCKET_SUPPORT_CHAT_URL } from '@/lib/constants/url.constants'
import { getMediaSource } from '@/lib/utils'
import { cn } from '@/lib/utils/twMerge'
import { checkAccessRoles } from '@/lib/utils/accessRoles'

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
		// Проверка на роли должна быть внутри компонента, а не на верхнем уровне
		if (!profile?.data?.id) return

		
		// Инициализация сокета
		const socketInstance = io(SERVER_URL, {
			path: SOCKET_SUPPORT_CHAT_URL,
			auth: { userId: profile.data.id },
			withCredentials: true,
			transports: ['websocket']
		})

		setSocket(socketInstance)

		// Обработчики событий сокета
		socketInstance.on('connect', () => {
			console.log('Connected to support socket')
			setIsConnected(true)
			setIsLoading(false)
		})

		socketInstance.on('disconnect', () => {
			console.log('Disconnected from support socket')
			setIsConnected(false)
		})

		socketInstance.on('newMessage', (newMessage: Message) => {
			setMessages(prev => [...prev, newMessage])
		})

		socketInstance.on('supportConnected', (data: { supportName: string; support: Account }) => {
			console.log('Support connected:', data)
			setSupport(data.support)
		})

		socketInstance.on('chatFinished', () => {
			console.log('Chat finished')
			setSupport(null)
			setChatStarted(false)
			// Добавляем системное сообщение о завершении чата
			const systemMessage: Message = {
				id: uuidv4(),
				message: 'Чат завершен. Вы можете запросить поддержку снова, если потребуется помощь.',
				senderId: 'system',
				sender: { id: 'system', userName: 'Система' } as Account,
				createdAt: new Date(),
				updatedAt: new Date()
			}
			setMessages(prev => [...prev, systemMessage])
		})

		socketInstance.on('chatClosed', () => {
			console.log('Chat closed by admin')
			setSupport(null)
			setChatStarted(false)
			// Добавляем системное сообщение о закрытии чата администратором
			const systemMessage: Message = {
				id: uuidv4(),
				message: 'Чат был закрыт администратором. Вы можете запросить поддержку снова, если потребуется помощь.',
				senderId: 'system',
				sender: { id: 'system', userName: 'Система' } as Account,
				createdAt: new Date(),
				updatedAt: new Date()
			}
			setMessages(prev => [...prev, systemMessage])
		})

		socketInstance.on('supportAssigned', (data: { support: Account }) => {
			console.log('Support assigned:', data)
			setSupport(data.support)
		})

		// Альтернативное событие для совместимости
		socketInstance.on('supportConnected', (data: { support: Account }) => {
			console.log('Support connected:', data)
			setSupport(data.support)
		})

		// Проверка активного чата при подключении
		socketInstance.emit(
			'getUserChat',
			{ userId: profile.data.id },
			(response: {
				success: boolean
				chat?: {
					status: string
					assignedAdmin?: Account
				}
			}) => {
				console.log('Get user chat response:', response)
				if (response.success && response.chat) {
					// Проверяем статус чата
					if (response.chat.status === 'ACTIVE' || response.chat.status === 'WAITING') {
						setChatStarted(true)
						if (response.chat.assignedAdmin) {
							setSupport(response.chat.assignedAdmin)
						}
					} else {
						// Если чат не активен (CLOSED, FINISHED и т.д.), сбрасываем состояние
						setChatStarted(false)
						setSupport(null)
					}
				} else {
					// Если чата нет или запрос не успешен, сбрасываем состояние
					setChatStarted(false)
					setSupport(null)
				}
			}
		)
		// Получаем историю сообщений
		socketInstance.emit(
			'getChatHistory',
			{ userId: profile.data.id },
			(response: { success: boolean; history: Message[]; chatStatus?: string }) => {
				if (response.success) {
					setMessages(response.history)

					// Проверяем статус чата из ответа истории
					if (response.chatStatus) {
						if (response.chatStatus === 'ACTIVE' || response.chatStatus === 'WAITING') {
							setChatStarted(true)

							// Ищем сообщения от администратора
							const adminMessages = response.history.filter(msg =>
								msg.sender.roles?.some(role => role.name === 'ADMIN' || role.name === 'SUPER_ADMIN' || role.name === 'SUPPORT')
							)

							if (adminMessages.length > 0) {
								// Берем последнее сообщение от администратора
								const lastAdminMessage = adminMessages[adminMessages.length - 1]
								setSupport(lastAdminMessage.sender)
							}
						} else {
							// Если чат закрыт или завершен
							setChatStarted(false)
							setSupport(null)
						}
					} else {
						// Если статус не пришел, определяем по истории
						// Если есть сообщения и последнее не системное о закрытии
						const lastMessage = response.history[response.history.length - 1]
						const isClosedMessage =
							lastMessage &&
							lastMessage.senderId === 'system' &&
							(lastMessage.message.includes('закрыт') || lastMessage.message.includes('завершен'))

						if (response.history.length > 0 && !isClosedMessage) {
							setChatStarted(true)

							// Проверяем, есть ли назначенный администратор
							const adminMessages = response.history.filter(msg =>
								msg.sender.roles?.some(role => role.name === 'ADMIN' || role.name === 'SUPER_ADMIN' || role.name === 'SUPPORT')
							)

							if (adminMessages.length > 0) {
								setSupport(adminMessages[adminMessages.length - 1].sender)
							}
						} else {
							setChatStarted(false)
							setSupport(null)
						}
					}
				}
				setIsLoading(false)
			}
		)

		return () => {
			socketInstance.disconnect()
		}
	}, [profile?.data?.id])

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

		// Используем uuid вместо useId
		const messageId = uuidv4()

		// Создаем объект сообщения
		const messageData = {
			content: message,
			sender: profile.data,
			receiver: support || { id: 'support' }, // Если нет назначенного администратора, отправляем всем администраторам
			createdAt: new Date(),
			updatedAt: new Date()
		}

		// Отображаем сообщение локально сразу
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

		// Отправляем сообщение через сокет
		socket.emit('sendMessage', messageData, (response: { success: boolean; message: Message }) => {
			if (!response.success) {
				console.error('Failed to send message')
				// Можно добавить обработку ошибки отправки
			}
		})
	}

	// Проверка на наличие профиля должна быть здесь
	if (!profile?.data) {
		return (
			<ExpandableChat icon={<MessageCircle />}>
				<ExpandableChatBody>
					<Typography className='flex h-full items-center justify-center text-gray-500'>Необходима авторизация</Typography>
				</ExpandableChatBody>
			</ExpandableChat>
		)
	}
	if (checkAccessRoles(profile.data.roles.map(role => role.name),['SUPER_ADMIN'])) return null

	return (
		<ExpandableChat icon={<MessageCircle className='text-white' />}>
			<ExpandableChatHeader className='bg-gradient-to-r from-blue-600 to-indigo-700 text-white'>
				{support ? (
					<div className='flex items-center gap-3'>
						<Avatar className='h-8 w-8 border-2 border-white/30'>
							<AvatarFallback className='bg-blue-400 text-white'>{support.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
						</Avatar>
						<div>
							<Typography className='font-medium'>{support.userName}</Typography>
							<Typography className='text-blue-100'>Менеджер поддержки</Typography>
						</div>
					</div>
				) : chatStarted ? (
					<div className='flex items-center gap-3'>
						<div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-400/30'>
							<div className='h-3 w-3 animate-pulse rounded-full bg-blue-200'></div>
						</div>
						<div>
							<Typography className='font-medium'>Ожидание подключения</Typography>
							<Typography className='text-blue-100'>Менеджер скоро присоединится</Typography>
						</div>
					</div>
				) : (
					<div className='flex w-full items-center justify-between'>
						<Typography className='font-medium'>Чат поддержки</Typography>
						<button
							onClick={requestSupport}
							disabled={!isConnected || isLoading}
							className='rounded-full bg-white px-4 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-50 disabled:bg-blue-100 disabled:text-blue-400'>
							{isLoading ? 'Загрузка...' : 'Запросить поддержку'}
						</button>
					</div>
				)}
			</ExpandableChatHeader>

			<ExpandableChatBody className='bg-gray-50'>
				{isLoading ? (
					<div className='flex h-full flex-col items-center justify-center gap-3 text-gray-500'>
						<div className='h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600'></div>
						<Typography>Загрузка сообщений...</Typography>
					</div>
				) : messages.length === 0 && !chatStarted ? (
					<div className='flex h-full flex-col items-center justify-center gap-4 p-6 text-center'>
						<div className='rounded-full bg-blue-100 p-4'>
							<MessageCircle className='h-10 w-10 text-blue-600' />
						</div>
						<Typography className='font-medium text-gray-800'>Добро пожаловать в чат поддержки</Typography>
						<Typography className='text-gray-500'>Нажмите "Запросить поддержку", чтобы начать общение с менеджером</Typography>
					</div>
				) : (
					<div className='flex flex-col space-y-4 p-4'>
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
										{msg.senderId === profile.data.id ? (
											<Avatar className='flex-shrink-0 border border-blue-200'>
												<AvatarImage src={getMediaSource(profile.data?.picture)} />
												<AvatarFallback className='bg-blue-600 text-white'>
													{profile.data?.userName.slice(0, 2).toUpperCase()}
												</AvatarFallback>
											</Avatar>
										) : (
											<Avatar className='flex-shrink-0 border border-indigo-200 bg-indigo-100'>
												<AvatarImage src={support?.picture ? getMediaSource(support.picture) : undefined} />
												<AvatarFallback className='bg-indigo-600 text-white'>
													{support?.userName ? support.userName.slice(0, 2).toUpperCase() : <CircleUser size={20} />}
												</AvatarFallback>
											</Avatar>
										)}

										<div
											className={cn(
												'flex max-w-[75%] flex-col',
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
											<div className='mt-1 text-xs text-gray-500'>
												{formatter.dateTime(new Date(msg.createdAt), {
													hour: 'numeric',
													minute: 'numeric'
												})}
											</div>
										</div>
									</>
								)}
							</div>
						))}
					</div>
				)}
			</ExpandableChatBody>

			<ExpandableChatFooter className='bg-white shadow-inner'>
				<form onSubmit={handleSubmit} className='w-full'>
					<div className='flex gap-2'>
						<input
							type='text'
							value={message}
							onChange={e => setMessage(e.target.value)}
							className='flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
							placeholder='Введите сообщение...'
							disabled={!isConnected || (!support && !chatStarted)}
						/>
						<button
							type='submit'
							disabled={!isConnected || (!support && !chatStarted) || !message.trim()}
							className='rounded-full bg-blue-600 px-4 py-2.5 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-300'>
							Отправить
						</button>
					</div>
				</form>
			</ExpandableChatFooter>
		</ExpandableChat>
	)
}
