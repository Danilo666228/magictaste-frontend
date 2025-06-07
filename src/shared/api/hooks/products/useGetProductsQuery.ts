import { useQuery } from '@tanstack/react-query'

import { getProducts } from '@/shared/api/request'

export const useGetProductsQuery = (settings?: QuerySettings<typeof getProducts>) =>
	useQuery({
		queryKey: ['getProducts', settings?.config?.params],
		queryFn: () => getProducts({ config: settings?.config }),
		...settings?.options
	})
