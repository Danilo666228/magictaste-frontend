import { api } from '@/shared/api/instance'
import { Order } from '@/shared/api/types'

export type GetOrdersRequestConfig = RequestConfig

export const getOrders = (requestConfig?: GetOrdersRequestConfig) => api.get<Order[]>('/orders', requestConfig?.config)