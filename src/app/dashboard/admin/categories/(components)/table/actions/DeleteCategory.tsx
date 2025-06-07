import { DropdownMenuItem } from '@/components/ui/common'
import { useDeleteCategoryMutation } from '@/shared/api/hooks/category/useDeleteCategoryMutation'
import { useQueryClient } from '@tanstack/react-query'

interface DeleteCategoryProps {
	categoryId: string
}

export function DeleteCategory({ categoryId }: DeleteCategoryProps) {
	const queryClient = useQueryClient()
	const { mutate: deleteCategory } = useDeleteCategoryMutation({
		options: {
			onSuccess: () => queryClient.refetchQueries({ queryKey: ['getCategory'] })
		}
	})

	const handleDelete = () => {
		deleteCategory({ config: { params: { categoryId } } })
	}

	return <DropdownMenuItem onClick={handleDelete}>Удалить</DropdownMenuItem>
}
