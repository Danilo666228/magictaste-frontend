import { useQueryClient } from '@tanstack/react-query'

import { DropdownMenuItem } from '@/components/ui/common'

import { useDeleteCategoryMutation } from '@/shared/api/hooks/category/useDeleteCategoryMutation'
import { useGetCategoryQuery } from '@/shared/api/hooks/category/useGetCategoryQuery'

interface DeleteCategoryProps {
	categoryId: string
}

export function DeleteCategory({ categoryId }: DeleteCategoryProps) {
	const queryClient = useQueryClient()
	const { mutateAsync: deleteCategory } = useDeleteCategoryMutation({
		options: {
			onSuccess: () => queryClient.refetchQueries({ queryKey: ['getCategory'] })
		}
	})

	const handleDelete = () => {
		deleteCategory({ config: { params: { categoryId } } })
	}

	return <DropdownMenuItem onClick={handleDelete}>Удалить</DropdownMenuItem>
}
