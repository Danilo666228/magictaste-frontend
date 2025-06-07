import { UpdateIngredientRequestConfig, updateIngredient } from '../../request/ingredient/update'
import { useMutation } from '@tanstack/react-query'

export const useUpdateIngredientMutation = (settings?: MutationSettings<UpdateIngredientRequestConfig, typeof updateIngredient>) =>
	useMutation({
		mutationKey: ['updateIngredient'],
		mutationFn: ({ params, config }) => updateIngredient({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
