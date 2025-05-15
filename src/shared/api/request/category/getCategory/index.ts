import { api } from '@/shared/api/instance'
import { Category } from '@/shared/api/types'

export type GetCategoryRequestConfig = RequestConfig

interface GetCategoryResponse {
	categories: Category[]
	total: number
}

export const getCategory = (requestConfig?: GetCategoryRequestConfig) => api.get<GetCategoryResponse>('/category', requestConfig?.config)
