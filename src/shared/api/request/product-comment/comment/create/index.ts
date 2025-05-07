import { api } from '@/shared/api/instance'

interface CreateProductCommentParams {
	comment: string
	rating?: number
}

export type CreateProductCommentRequestConfig = RequestConfig<CreateProductCommentParams>

export const createProductComment = ({ params, config }: CreateProductCommentRequestConfig) => api.post('/product-comments/comment', params, config)
