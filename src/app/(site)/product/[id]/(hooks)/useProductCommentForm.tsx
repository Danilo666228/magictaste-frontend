import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useModal } from '@/components/ui/elements/modal/FormModal/FormModalContext'

import { ProductCommentSchema } from '@/schemas/review/product-comment'

import { useProductComments } from './useProductComment'

interface UseProductCommentFormProps {
	productId: string
	commentId?: string
}

export function useProductCommentForm({ productId, commentId }: UseProductCommentFormProps) {
	const { closeModal } = useModal()
	const { addComment, addReply, isPending } = useProductComments({ productId, includeReplies: true, onSuccess: () => closeModal() })

	const form = useForm<ProductCommentSchema>({
		resolver: zodResolver(ProductCommentSchema),
		defaultValues: {
			comment: ''
		},
		mode: 'onChange'
	})

	const onSubmit = (data: ProductCommentSchema) => {
		if (commentId) {
			addReply({ comment: data.comment, parentId: commentId })
		} else {
			addComment({ comment: data.comment, rating: data.rating ?? 0 })
		}
	}

	return {
		form,
		onSubmit,
		isPending
	}
}
