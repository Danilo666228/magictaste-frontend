import { CreateIngredientRequestConfig, createIngredient } from '../../request/ingredient/create'
import { useMutation } from '@tanstack/react-query'

export const useCreateIngredientMutation = (settings?: MutationSettings<CreateIngredientRequestConfig, typeof createIngredient>) =>
	useMutation({
		mutationKey: ['createIngredient'],
		mutationFn: ({ params, config }) => createIngredient({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
