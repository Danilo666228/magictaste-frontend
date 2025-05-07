import { Product } from './product'

export interface Category {
	id: string
	title: string
	imageUrl: string
	createdAt: Date
	updatedAt: Date
	products?: Product[]
}
