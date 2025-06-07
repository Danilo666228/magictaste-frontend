import { DeleteProductCommentRequestConfig, deleteProductComment } from '@/shared/api/request'
import { useMutation } from '@tanstack/react-query'

export const useDeleteProductCommentMutation = (settings?: MutationSettings<DeleteProductCommentRequestConfig, typeof deleteProductComment>) =>
	useMutation({
		mutationKey: ['deleteProductComment'],
		mutationFn: ({ config }) => deleteProductComment({ config: { ...settings?.config, ...config } }),
		...settings?.options
	})
