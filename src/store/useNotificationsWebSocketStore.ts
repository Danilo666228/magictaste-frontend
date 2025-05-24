import { Socket, io } from 'socket.io-client'
import { create } from 'zustand'

import { SERVER_URL, SOCKET_NOTIFICATIONS_URL } from '@/lib/constants/url.constants'

import { Notification } from '@/shared/api/types'

interface ToastMessage {
	type: 'success' | 'error' | 'warning' | 'info'
	title: string
	message: string
	duration?: number
}

interface NotificationsState {
	notifications: Notification[]
	toastMessages: ToastMessage[]
	isLoading: boolean
	error: string | null
	socket: Socket | null
	currentUserId: string | null
	isConnected: boolean

	initSocket: (userId: string) => void
	disconnectSocket: () => void
	fetchNotifications: () => void
	markAsRead: (id: string) => void
	markAllAsRead: () => void
	deleteNotification: (id: string) => void
	deleteAllNotifications: () => void
	clearToastMessages: () => void
	checkConnection: () => boolean
}

export const useNotificationsWebSocketStore = create<NotificationsState>((set, get) => ({
	notifications: [],
	toastMessages: [],
	isLoading: true,
	error: null,
	socket: null,
	currentUserId: null,
	isConnected: false,

	initSocket: userId => {
		if (get().socket && get().currentUserId === userId) {
			return
		}

		const temporaryId = !userId ? localStorage.getItem('temporaryId') || crypto.randomUUID() : undefined

		const socket = io(SERVER_URL, {
			path: SOCKET_NOTIFICATIONS_URL,
			transports: ['websocket', 'polling'],
			query: userId ? { userId } : { temporaryId },
			reconnection: true,
			reconnectionAttempts: 5,
			reconnectionDelay: 1000,
			autoConnect: true
		})

		socket.on('connect', () => {
			set({ isLoading: false })
			socket.emit('getNotifications')
		})

		socket.on('disconnect', () => {
			set({ error: 'Соединение с сервером утеряно' })
		})

		socket.on('notifications', (notifications: Notification[]) => {
			set({ notifications, isLoading: false })
		})

		socket.on('toast', (message: ToastMessage) => {
			set(state => ({
				toastMessages: [...state.toastMessages, message]
			}))
		})

		set({ socket, currentUserId: userId })
	},

	disconnectSocket: () => {
		const { socket } = get()
		if (socket) {
			socket.off('connect')
			socket.off('notifications')
			socket.off('toast')
			socket.off('disconnect')
			socket.disconnect()
			set({ socket: null, currentUserId: null })
		}
	},

	checkConnection: () => {
		const { socket } = get()

		const isSocketConnected = Boolean(socket && socket.connected)

		set({ isConnected: isSocketConnected })

		return isSocketConnected
	},

	fetchNotifications: () => {
		set({ isLoading: true })
		get().socket?.emit('getNotifications')
	},

	markAsRead: id => {
		get().socket?.emit('markAsRead', { notificationId: id })
		set(state => ({
			notifications: state.notifications.map(notification => (notification.id === id ? { ...notification, isRead: true } : notification))
		}))
	},

	markAllAsRead: () => {
		get().socket?.emit('markAllAsRead')
		set(state => ({
			notifications: state.notifications.map(notification => ({ ...notification, isRead: true }))
		}))
	},

	deleteNotification: id => {
		get().socket?.emit('deleteNotification', { notificationId: id })
		set(state => ({
			notifications: state.notifications.filter(notification => notification.id !== id)
		}))
	},

	deleteAllNotifications: () => {
		get().socket?.emit('deleteAllNotifications')
		set({ notifications: [] })
	},

	clearToastMessages: () => {
		set({ toastMessages: [] })
	}
}))
