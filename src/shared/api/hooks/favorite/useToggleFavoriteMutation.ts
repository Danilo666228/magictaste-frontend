import { useMutation } from '@tanstack/react-query'

import { ToggleFavoriteProductRequestConfig, toggleFavoriteProduct } from '@/shared/api/request'

export const useToggleFavoriteMutation = (settings?: MutationSettings<ToggleFavoriteProductRequestConfig, typeof toggleFavoriteProduct>) =>
	useMutation({
		mutationKey: ['toggleFavorite'],
		mutationFn: ({ config }) => toggleFavoriteProduct({ config: { ...settings?.config, ...config } }),
		...settings?.options
	})
