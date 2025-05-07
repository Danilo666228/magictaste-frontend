import { Account } from './account'

export interface Message {
	id: string
	message: string
	receiverId : string
	receiver : Account
	senderId : string
	sender : Account
	createdAt : Date
	updatedAt : Date
}
