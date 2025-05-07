import { api } from '@/shared/api/instance'

export type RemoveDeliveryAddressRequestConfig = RequestConfig

export const removeDeliveryAddress = (requestConfig?: RemoveDeliveryAddressRequestConfig) => api.delete('/delivery-address/remove', requestConfig?.config)