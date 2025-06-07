import { getProductsStatistics } from '../../request/statistics/products'
import { useQuery } from '@tanstack/react-query'

export const useGetProductsStatisticsQuery = (settings?: QuerySettings<typeof getProductsStatistics>) =>
	useQuery({
		queryKey: ['getProductsStatistics', settings?.config?.params],
		queryFn: () => getProductsStatistics({ config: settings?.config }),
		...settings?.options
	})
