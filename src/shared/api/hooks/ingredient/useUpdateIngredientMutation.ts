import { useMutation } from '@tanstack/react-query'

import { UpdateIngredientRequestConfig, updateIngredient } from '../../request/ingredient/update'

export const useUpdateIngredientMutation = (settings?: MutationSettings<UpdateIngredientRequestConfig, typeof updateIngredient>) =>
	useMutation({
		mutationKey: ['updateIngredient'],
		mutationFn: ({ params, config }) => updateIngredient({ params, config: { ...settings?.config, ...config } }),
			...settings?.options
		})
