import { useQueryClient } from '@tanstack/react-query'

import { DropdownMenuItem } from '@/components/ui/common'

import { useDeleteIngredientMutation } from '@/shared/api/hooks/ingredient/useDeleteIngredientMutation'

interface DeleteIngredientProps {
	ingredientId: string
}

export function DeleteIngredient({ ingredientId }: DeleteIngredientProps) {
	const queryClient = useQueryClient()
	const { mutateAsync: deleteIngredient } = useDeleteIngredientMutation({
		options: {
			onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getIngredients'] })
		}
	})

	const handleDelete = () => {
		deleteIngredient({ config: { params: { ingredientId } } })
	}

	return <DropdownMenuItem onClick={handleDelete}>Удалить</DropdownMenuItem>
}
