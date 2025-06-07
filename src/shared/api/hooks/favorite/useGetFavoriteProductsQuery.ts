import { getFavoriteProducts } from '@/shared/api/request'
import { useQuery } from '@tanstack/react-query'

export const useGetFavoriteProductsQuery = (settings?: QuerySettings<typeof getFavoriteProducts>) =>
	useQuery({
		queryKey: ['getFavoriteProducts', settings?.config?.params],
		queryFn: () => getFavoriteProducts({ config: settings?.config }),
		...settings?.options
	})
