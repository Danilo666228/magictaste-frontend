import { api } from '@/shared/api/instance'

interface UpdateProductCommentParams {
	comment: string
	rating?: number
}

export type UpdateProductCommentRequestConfig = RequestConfig<UpdateProductCommentParams>

export const updateProductComment = ({ params, config }: UpdateProductCommentRequestConfig) => api.put('/product-comments/comment', params, config)
