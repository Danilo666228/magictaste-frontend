import { useQuery } from '@tanstack/react-query'

import { getDeliveryAddresses } from '@/shared/api/request'

export const useGetDeliveryAddress = (settings?: QuerySettings<typeof getDeliveryAddresses>) =>
	useQuery({
		queryKey: ['getDeliveryAddresses'],
		queryFn: () => getDeliveryAddresses({ config: settings?.config }),
		...settings?.options
	})
