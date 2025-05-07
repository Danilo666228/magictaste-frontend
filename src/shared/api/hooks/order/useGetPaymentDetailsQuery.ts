import { useQuery } from '@tanstack/react-query'
import { getPaymentLink } from '@/shared/api/request'

export const useGetPaymentDetailsQuery = (settings?: QuerySettings<typeof getPaymentLink>) => useQuery({
	queryKey: ['getPaymentLink'],
	queryFn: () => getPaymentLink({config : settings?.config }),
	...settings?.options
})