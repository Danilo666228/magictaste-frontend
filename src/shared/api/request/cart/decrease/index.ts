import { api } from '@/shared/api/instance'

interface DecreaseProductParams {
	productId: string
	quantity?: number
}

export type DecreaseProductRequestConfig = RequestConfig<DecreaseProductParams>

export const decreaseProduct = ({ params, config }: DecreaseProductRequestConfig) => api.post('/cart/decrease', params, config)
