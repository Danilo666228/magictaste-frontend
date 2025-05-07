import { api } from '@/shared/api/instance'
import { DeliveryAddress } from '@/shared/api/types'

export interface GetDeliveryAddressByIdParams {
	deliveryAddressId : string | undefined
}

 export type GetDeliveryAddressByIdRequestConfig = RequestConfig<GetDeliveryAddressByIdParams>

export const getDeliveryAddressById = ({params,config} : GetDeliveryAddressByIdRequestConfig) => api.get<DeliveryAddress>(`/delivery-address/${params.deliveryAddressId}`,config)