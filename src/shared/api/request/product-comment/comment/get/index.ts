import { api } from '@/shared/api/instance'
import { ProductComment } from '@/shared/api/types/product-comment'

export type GetProductCommentsRequestConfig = RequestConfig

export const getProductComments = ({ config }: GetProductCommentsRequestConfig) => api.get<ProductComment[]>('/product-comments/comments', config)
