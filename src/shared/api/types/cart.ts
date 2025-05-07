import { Product } from './product'

export interface Cart {
	items: CartItem[]
	totalQuantity: number
	totalItems: number
}

export interface CartItem {
	id: string
	quantity: number
	createdAt: Date
	updatedAt: Date
	product: Product
}
