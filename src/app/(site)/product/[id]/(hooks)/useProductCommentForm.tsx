import { useProductComments } from './useProductComment'
import { useModal } from '@/components/ui/elements/modal/Default/ModalContext'
import { ProductCommentSchema } from '@/schemas/review/product-comment'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

interface UseProductCommentFormProps {
	productId: string
	commentId?: string
}

export function useProductCommentForm({ productId, commentId }: UseProductCommentFormProps) {
	const { closeModal } = useModal()
	const { addComment, addReply, isPending } = useProductComments(productId)

	const form = useForm<ProductCommentSchema>({
		resolver: zodResolver(ProductCommentSchema),
		defaultValues: {
			comment: ''
		},
		mode: 'onChange'
	})

	const onSubmit = (data: ProductCommentSchema) => {
		if (commentId) {
			addReply(data.comment, commentId)
		} else {
			addComment(data.comment, data.rating ?? 0)
		}
		closeModal()
	}

	return {
		form,
		onSubmit,
		isPending
	}
}
