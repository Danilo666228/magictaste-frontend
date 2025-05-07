import { api } from '@/shared/api/instance'
import { Cart } from '@/shared/api/types'

export interface AddProductParams {
	productId: string
	quantity?: number
}

export type AddProductRequestConfig = RequestConfig<AddProductParams>

export const addProduct = ({ params, config }: AddProductRequestConfig) => api.post<Cart>('/cart/add', params, config)
