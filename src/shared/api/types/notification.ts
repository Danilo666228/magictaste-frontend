import { NotificationType } from '@/shared/api/constants/notification'

export interface Notification {
	id: string
	title: string
	message: string
	link: string
	type: (typeof NotificationType)[keyof typeof NotificationType]
	isRead: boolean
	accountId: string
	createdAt: Date
	updatedAt: Date
}
export interface UnreadNotification {
	count: number
	notifications: Notification[]
}
