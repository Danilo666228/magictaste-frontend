import { useMutation } from '@tanstack/react-query'

import { ChangeIngredientImageRequestConfig, changeIngredientImage } from '../../request/ingredient/change/image'

export const useChangeIngredientImageMutation = (
	settings?: MutationSettings<ChangeIngredientImageRequestConfig, typeof changeIngredientImage>
) =>
	useMutation({
		mutationKey: ['changeIngredientImage'],
		mutationFn: ({ params, config }) => changeIngredientImage({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
