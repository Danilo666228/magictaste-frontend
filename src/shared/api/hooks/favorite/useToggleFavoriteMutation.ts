import { ToggleFavoriteProductRequestConfig, toggleFavoriteProduct } from '@/shared/api/request'
import { useMutation } from '@tanstack/react-query'

export const useToggleFavoriteMutation = (settings?: MutationSettings<ToggleFavoriteProductRequestConfig, typeof toggleFavoriteProduct>) =>
	useMutation({
		mutationKey: ['toggleFavorite'],
		mutationFn: ({ config }) => toggleFavoriteProduct({ config: { ...settings?.config, ...config } }),
		...settings?.options
	})
