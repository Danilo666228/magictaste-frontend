import { api } from '@/shared/api/instance'

export interface CreateDeliveryAddressParams {
	city: string
	street: string
	house: string
	flat: string
}
export type PostDeliveryAddressRequestConfig = RequestConfig<CreateDeliveryAddressParams>

export const postDeliveryAddress = ({ params, config }: PostDeliveryAddressRequestConfig) =>
	api.post('/delivery-address', params, config)
