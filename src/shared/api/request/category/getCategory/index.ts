import { api } from '@/shared/api/instance'
import { Category } from '@/shared/api/types'

export type GetCategoryRequestConfig = RequestConfig

export const getCategory = (requestConfig?: GetCategoryRequestConfig) => api.get<Category[]>('/category', requestConfig?.config)
