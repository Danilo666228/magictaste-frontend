import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { useCreateProductCommentMutation } from '@/shared/api/hooks/product-comment/useCreateProductCommentMutation'
import { useCreateReplyProductCommentMutation } from '@/shared/api/hooks/product-comment/useCreateReplyProductCommentMutation'
import { useDeleteProductCommentMutation } from '@/shared/api/hooks/product-comment/useDeleteProductCommentMutation'
import { useGetProductCommentsQuery } from '@/shared/api/hooks/product-comment/useGetProductCommentsQuery'
import { useUpdateProductCommentMutation } from '@/shared/api/hooks/product-comment/useUpdateProductCommentMutation'
import { ProductComment } from '@/shared/api/types/product-comment'

interface UseProductCommentsProps {
	productId: string
	includeReplies?: boolean
	onSuccess?: () => void
	onError?: (error: Error) => void
}

export function useProductComments({ productId, includeReplies = true, onSuccess, onError }: UseProductCommentsProps) {
	const router = useRouter()
	const {
		data: comments,
		isLoading,
		refetch
	} = useGetProductCommentsQuery({
		config: {
			params: { productId, includeReplies }
		}
	})

	const { mutate: createComment, isPending: isCreating } = useCreateProductCommentMutation({
		options: {
			onSuccess: () => {
				refetch()
				onSuccess?.()
			},
			onError
		}
	})

	const { mutate: createReply, isPending: isReplying } = useCreateReplyProductCommentMutation({
		options: {
			onSuccess: () => {
				refetch()
				onSuccess?.()
			},
			onError
		}
	})

	const { mutate: deleteComment, isPending: isDeleting } = useDeleteProductCommentMutation({
		options: {
			onSuccess: () => {
				refetch()
				onSuccess?.()
			},
			onError
		}
	})

	const { mutate: updateComment, isPending: isUpdating } = useUpdateProductCommentMutation({
		options: {
			onSuccess: () => {
				refetch()
				onSuccess?.()
			},
			onError
		}
	})

	const addComment = useCallback(
		(params: { comment: string; rating: number }) => {
			createComment({ params, config: { params: { productId } } })
		},
		[createComment, productId]
	)

	const addReply = useCallback(
		(params: { comment: string; parentId: string }) => {
			createReply({
				params: { comment: params.comment },
				config: { params: { productId, parentId: params.parentId } }
			})
		},
		[createReply, productId]
	)

	const removeComment = useCallback(
		(commentId: string) => {
			deleteComment({ config: { params: { commentId } } })
		},
		[deleteComment]
	)

	const editComment = useCallback(
		(commentId: string, params: { comment: string; rating?: number }) => {
			updateComment({ params, config: { params: { commentId } } })
		},
		[updateComment]
	)

	const getAverageRating = useCallback((comments: ProductComment[]) => {
		if (!comments?.length) return 0
		return comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length
	}, [])

	const getRatingDistribution = useCallback((comments: ProductComment[]) => {
		return comments.reduce(
			(acc, comment) => {
				acc[Math.floor(comment.rating)] = (acc[Math.floor(comment.rating)] || 0) + 1
				return acc
			},
			{} as Record<number, number>
		)
	}, [])

	return {
		comments: comments?.data || [],
		isLoading,

		isPending: isCreating || isReplying || isDeleting || isUpdating,

		addComment,
		addReply,
		removeComment,
		editComment,
		refetch,

		getAverageRating,
		getRatingDistribution
	}
}
