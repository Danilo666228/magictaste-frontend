import { api } from '@/shared/api/instance'

export type ChangeProductStatusRequestConfig = RequestConfig

export const changeProductStatus = (requestConfig?: ChangeProductStatusRequestConfig) =>
	api.put('/products/sale-status', null, requestConfig?.config)
