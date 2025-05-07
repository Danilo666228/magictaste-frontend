import { useQuery } from '@tanstack/react-query'

import { getDeliveryAddressById, GetDeliveryAddressByIdParams, } from '@/shared/api/request'

export const useGetDeliveryAddressById = (params : GetDeliveryAddressByIdParams, settings?: QuerySettings<typeof getDeliveryAddressById>) =>
	useQuery({
		queryKey: ['getDeliveryAddressById',params.deliveryAddressId],
		queryFn: () => getDeliveryAddressById({params, config : settings?.config}),
		...settings?.options
	})
