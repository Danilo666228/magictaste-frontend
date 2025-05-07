import { api } from '@/shared/api/instance'
import { Category } from '@/shared/api/types'

export type GetPopularCategoryRequestConfig = RequestConfig

export const getPopularCategory = (requestConfig: GetPopularCategoryRequestConfig) =>
	api.get<Category[]>('/category/popular', requestConfig.config)
