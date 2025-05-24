export interface Notification {
	id: string
	title: string
	message: string
	link: string
	type: 'success' | 'error' | 'info'
	isRead: boolean
	accountId: string
	createdAt: Date
	updatedAt: Date
}

export interface UnreadNotification {
	count: number
	notifications: Notification[]
}
