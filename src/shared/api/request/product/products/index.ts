import { api } from '@/shared/api/instance'
import { Product } from '@/shared/api/types'

export type GetProductsConfig = RequestConfig

export type GetProductsResponse = {
	products: Product[]
	total: number
	page: number
	limit: number
	totalPages: number
}

export const getProducts = (requestConfig?: GetProductsConfig) => api.get<GetProductsResponse>('/products', requestConfig?.config)
