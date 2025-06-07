import { getStatisticSaleV2 } from '../../request/statistics/sales-v2'
import { useQuery } from '@tanstack/react-query'

export const useGetStatisticSale = (settings?: QuerySettings<typeof getStatisticSaleV2>) =>
	useQuery({
		queryKey: ['getStatisticSaleV2', settings?.config?.params],
		queryFn: () => getStatisticSaleV2({ config: settings?.config }),
		...settings?.options
	})
