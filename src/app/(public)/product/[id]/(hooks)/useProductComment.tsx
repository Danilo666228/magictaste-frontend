import { useCallback } from 'react'

import { useCreateProductCommentMutation } from '@/shared/api/hooks/product-comment/useCreateProductCommentMutation'
import {
	useCreateReplyProductCommentMutation
} from '@/shared/api/hooks/product-comment/useCreateReplyProductCommentMutation'
import { useDeleteProductCommentMutation } from '@/shared/api/hooks/product-comment/useDeleteProductCommentMutation'
import { useGetProductCommentsQuery } from '@/shared/api/hooks/product-comment/useGetProductCommentsQuery'
import { useUpdateProductCommentMutation } from '@/shared/api/hooks/product-comment/useUpdateProductCommentMutation'
import { ProductComment } from '@/shared/api/types/product-comment'

export function useProductComments(productId: string, includeReplies: boolean = true) {
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
			}
		}
	})

	const { mutate: createReply, isPending: isReplying } = useCreateReplyProductCommentMutation({
		options: {
			onSuccess: () => {
				refetch()
			}
		}
	})

	const { mutate: deleteComment, isPending: isDeleting } = useDeleteProductCommentMutation({
		options: {
			onSuccess: () => {
				refetch()
			}
		}
	})

	const { mutate: updateComment, isPending: isUpdating } = useUpdateProductCommentMutation({
		options: {
			onSuccess: () => {
				refetch()
			}
		}
	})

	const addComment = (comment: string, rating: number) => {
		createComment({ params: { comment, rating }, config: { params: { productId } } })
	}

	const addReply = (comment: string, parentId: string) => {
		createReply({
			params: { comment },
			config: { params: { productId, parentId } }
		})
	}

	const removeComment = (commentId: string) => {
		deleteComment({ config: { params: { commentId } } })
	}

	const editComment = (commentId: string, params: { comment: string; rating?: number }) => {
		updateComment({ params, config: { params: { commentId } } })
	}

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
