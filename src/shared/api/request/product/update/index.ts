import { api } from '@/shared/api/instance'

interface UpdateProductParams {
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

export type UpdateProductRequestConfig = RequestConfig<UpdateProductParams>

export const updateProduct = ({ params, config }: UpdateProductRequestConfig) => api.put(`/products`, params, config)
