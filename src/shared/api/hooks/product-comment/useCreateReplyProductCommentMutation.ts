import { useMutation } from '@tanstack/react-query'

import { CreateReplyProductCommentRequestConfig, createReplyProductComment } from '@/shared/api/request'

export const useCreateReplyProductCommentMutation = (
	settings?: MutationSettings<CreateReplyProductCommentRequestConfig, typeof createReplyProductComment>
) =>
	useMutation({
		mutationKey: ['createReplyProductComment'],
		mutationFn: ({ params, config }) => createReplyProductComment({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
