import { DropdownMenuItem } from '@/components/ui/common'

import { useDeleteIngredientMutation } from '@/shared/api/hooks/ingredient/useDeleteIngredientMutation'
import { useGetIngredientsQuery } from '@/shared/api/hooks/ingredient/useGetIngredientsQuery'

interface DeleteIngredientProps {
	ingredientId: string
}

export function DeleteIngredient({ ingredientId }: DeleteIngredientProps) {
	const { refetch } = useGetIngredientsQuery()
	const { mutateAsync: deleteIngredient } = useDeleteIngredientMutation({
		options: {
			onSuccess: () => refetch()
		}
	})

	const handleDelete = () => {
		deleteIngredient({ config: { params: { ingredientId } } })
	}

	return <DropdownMenuItem onClick={handleDelete}>Удалить</DropdownMenuItem>
}
