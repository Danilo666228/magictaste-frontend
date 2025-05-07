import { api } from '@/shared/api/instance'

export type DeleteProductCommentRequestConfig = RequestConfig

export const deleteProductComment = ({ config }: DeleteProductCommentRequestConfig) => api.delete('/product-comments/comment', config)
