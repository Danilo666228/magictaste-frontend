import { api } from '@/shared/api/instance'

interface CreateProductParams {
	title: string
	description: string
	price: number
	weight: number
	categoryId: string
	ingredients: {
		ingredientId: string
	}[]
	onSale: boolean
}

export type CreateProductRequestConfig = RequestConfig<CreateProductParams>

export const createProduct = ({ params, config }: CreateProductRequestConfig) => api.post('/products', params, config)
