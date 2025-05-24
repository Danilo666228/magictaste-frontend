import { useQueryClient } from '@tanstack/react-query'

import { useGetFavoriteProductsQuery } from '@/shared/api/hooks/favorite/useGetFavoriteProductsQuery'
import { useToggleFavoriteMutation } from '@/shared/api/hooks/favorite/useToggleFavoriteMutation'

export function useFavorite(search?: string) {
	const queryClient = useQueryClient()
	const getFavoriteQuery = useGetFavoriteProductsQuery({
		config: {
			params: {
				search
			}
		}
	})

	const toggleFavoriteMutation = useToggleFavoriteMutation({
		options: {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['getFavoriteProducts'] })
				queryClient.invalidateQueries({ queryKey: ['getProfile'] })
			}
		}
	})

	const toggleFavorite = (id: string) => {
		toggleFavoriteMutation.mutate({
			config: {
				params: { productId: id }
			}
		})
	}

	return {
		favorites: getFavoriteQuery.data,
		toggleFavorite
	}
}
