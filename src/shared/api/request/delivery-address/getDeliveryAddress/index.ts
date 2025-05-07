import { api } from '@/shared/api/instance'
import { DeliveryAddress } from '@/shared/api/types'

export type DeliveryAddressRequestConfig = RequestConfig

export const getDeliveryAddresses = (requestConfig: DeliveryAddressRequestConfig) =>
	api.get<DeliveryAddress[]>('/delivery-address/all', requestConfig.config)
