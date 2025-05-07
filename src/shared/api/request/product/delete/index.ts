import { api } from '@/shared/api/instance'

export type DeleteProductRequestConfig = RequestConfig

export const deleteProduct = (requestConfig?: DeleteProductRequestConfig) => api.delete(`/products`, requestConfig?.config)
