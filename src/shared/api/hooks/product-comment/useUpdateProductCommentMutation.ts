import { UpdateProductCommentRequestConfig, updateProductComment } from '@/shared/api/request'
import { useMutation } from '@tanstack/react-query'

export const useUpdateProductCommentMutation = (settings?: MutationSettings<UpdateProductCommentRequestConfig, typeof updateProductComment>) =>
	useMutation({
		mutationKey: ['updateProductComment'],
		mutationFn: ({ params, config }) => updateProductComment({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
