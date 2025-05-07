import { getOrders } from '@/shared/api/request'
import { useQuery } from '@tanstack/react-query'

export const useGetOrdersQuery = (settings?: QuerySettings<typeof getOrders>) => useQuery({
	queryKey: ['getOrders'],
	queryFn: () => getOrders({config : settings?.config }),
	...settings?.options
})