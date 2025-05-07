import { api } from '@/shared/api/instance'

interface CreateReplyProductCommentParams {
	comment: string
}

export type CreateReplyProductCommentRequestConfig = RequestConfig<CreateReplyProductCommentParams>

export const createReplyProductComment = ({ params, config }: CreateReplyProductCommentRequestConfig) =>
	api.post('/product-comments/comment/reply', params, config)
