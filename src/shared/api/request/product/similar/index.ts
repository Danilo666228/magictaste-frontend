import { api } from '@/shared/api/instance'
import { Product } from '@/shared/api/types'


export type SimilarProductRequestConfig = RequestConfig

export const getSimilarProduct = (requestConfig?: SimilarProductRequestConfig) => api.get<Product[]>('/products/similar', requestConfig?.config)