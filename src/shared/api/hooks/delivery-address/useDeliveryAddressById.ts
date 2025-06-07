import { GetDeliveryAddressByIdParams, getDeliveryAddressById } from '@/shared/api/request'
import { useQuery } from '@tanstack/react-query'

export const useGetDeliveryAddressById = (params: GetDeliveryAddressByIdParams, settings?: QuerySettings<typeof getDeliveryAddressById>) =>
	useQuery({
		queryKey: ['getDeliveryAddressById', params.deliveryAddressId],
		queryFn: () => getDeliveryAddressById({ params, config: settings?.config }),
		...settings?.options
	})
