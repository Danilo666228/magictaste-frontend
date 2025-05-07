import { useMutation } from '@tanstack/react-query'

import { DeleteProductCommentRequestConfig, deleteProductComment } from '@/shared/api/request'

export const useDeleteProductCommentMutation = (
	settings?: MutationSettings<DeleteProductCommentRequestConfig, typeof deleteProductComment>
) =>
	useMutation({
		mutationKey: ['deleteProductComment'],
		mutationFn: ({ config }) => deleteProductComment({ config: { ...settings?.config, ...config } }),
		...settings?.options
	})
