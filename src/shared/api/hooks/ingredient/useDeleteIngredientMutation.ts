import { DeleteIngredientRequestConfig, deleteIngredient } from '../../request/ingredient/delete'
import { useMutation } from '@tanstack/react-query'

export const useDeleteIngredientMutation = (settings?: MutationSettings<DeleteIngredientRequestConfig, typeof deleteIngredient>) =>
	useMutation({
		mutationKey: ['deleteIngredient'],
		mutationFn: ({ config }: DeleteIngredientRequestConfig) => deleteIngredient({ config: { ...settings?.config, ...config } }),
		...settings?.options
	})
