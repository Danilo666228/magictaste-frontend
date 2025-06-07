import { useQuery } from '@tanstack/react-query'

import { getDeliveryAddresses } from '@/shared/api/request'

export const useGetDeliveryAddress = (settings?: QuerySettings<typeof getDeliveryAddresses>) =>
	useQuery({
		queryKey: ['getDeliveryAddresses', settings?.config],
		queryFn: () => getDeliveryAddresses({ config: settings?.config }),
		...settings?.options
	})
