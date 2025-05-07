import { Account } from './account'
import { Product } from './product'

export interface ProductComment {
	id: string
	comment: string
	rating: number
	createdAt: Date
	updatedAt: Date
	account: Account
	product: Product
	replies: ProductCommentReply[]
}
export interface ProductCommentReply {
	id: string
	comment: string
	createdAt: Date
	updatedAt: Date
	account: Account
	product: Product
}
