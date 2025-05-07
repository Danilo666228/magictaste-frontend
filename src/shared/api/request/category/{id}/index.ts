import { api } from '@/shared/api/instance'
import { Category } from '@/shared/api/types'

export interface GetCategoryByIdParams {
	id: string
}

export type CategoryByIdRequestConfig = RequestConfig<GetCategoryByIdParams>

export const getCategoryById = ({ params, config }: CategoryByIdRequestConfig) => api.get<Category>(`/category/${params?.id}`, config)
