import { api } from '@/shared/api/instance'

export type DeleteItemRequestConfig = RequestConfig

export const deleteItem = (requestConfig: DeleteItemRequestConfig) => api.delete('/cart/item', requestConfig?.config)
