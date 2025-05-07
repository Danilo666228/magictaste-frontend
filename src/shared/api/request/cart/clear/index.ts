import { api } from '@/shared/api/instance'

export type ClearCartRequestConfig = RequestConfig

export const clearCart = (requestConfig?: ClearCartRequestConfig) => api.delete('/cart/clear', requestConfig?.config)
