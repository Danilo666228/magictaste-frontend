import { useMutation } from '@tanstack/react-query'

import { CreateProductCommentRequestConfig, createProductComment } from '@/shared/api/request'

export const useCreateProductCommentMutation = (
	settings?: MutationSettings<CreateProductCommentRequestConfig, typeof createProductComment>
) =>
	useMutation({
		mutationKey: ['createProductComment'],
		mutationFn: ({ params, config }) => createProductComment({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
