import { useQuery } from '@tanstack/react-query'

import { getFavoriteProducts } from '@/shared/api/request'

export const useGetFavoriteProductsQuery = (settings?: QuerySettings<typeof getFavoriteProducts>) =>
	useQuery({
		queryKey: ['getFavoriteProducts', settings?.config?.params],
		queryFn: () => getFavoriteProducts({ config: settings?.config }),
		...settings?.options
	})
