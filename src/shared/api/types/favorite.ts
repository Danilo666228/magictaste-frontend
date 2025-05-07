// TODO: Переделать тип
import { Product } from './product'

export interface Favorite {
	id: string
	product: Product
	createdAt: Date
	updatedAt: Date
}
