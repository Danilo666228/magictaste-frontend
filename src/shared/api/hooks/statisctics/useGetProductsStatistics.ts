import { useQuery } from '@tanstack/react-query'

import { getProductsStatistics } from '../../request/statistics/products'

export const useGetProductsStatisticsQuery = (settings?: QuerySettings<typeof getProductsStatistics>) =>
	useQuery({
		queryKey: ['getProductsStatistics', settings?.config?.params],
		queryFn: () => getProductsStatistics({ config: settings?.config }),
		...settings?.options
	})
