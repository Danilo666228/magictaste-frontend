import { api } from '@/shared/api/instance'

interface UpdateCategoryParams {
	title: string
}

export type UpdateCategoryRequestConfig = RequestConfig<UpdateCategoryParams>

export const updateCategory = ({ params, config }: UpdateCategoryRequestConfig) => api.put('/category', params, config)
