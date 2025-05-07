import { api } from '@/shared/api/instance'
import { Cart } from '@/shared/api/types'

export type GetCartConfig = RequestConfig

export const getCart = (requestConfig?: GetCartConfig) => api.get<Cart>('/cart', requestConfig?.config)
