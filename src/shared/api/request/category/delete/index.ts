import { api } from '@/shared/api/instance'

export type DeleteCategoryRequestConfig = RequestConfig

export const deleteCategory = (requestConfig?: DeleteCategoryRequestConfig) => api.delete('/category', requestConfig?.config)
