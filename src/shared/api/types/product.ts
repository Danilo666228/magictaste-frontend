import { Category } from './category'
import { Ingredient } from './ingredient'
import { ProductComment } from './product-comment'

export interface Product {
	id: string
	title: string
	description: string
	price: number
	weight: number
	imageUrl: string
	category: Category
	ingredients: Ingredient[]
	reviews: ProductComment[]
	onSale: boolean
	createdAt: Date
	updatedAt: Date
}
