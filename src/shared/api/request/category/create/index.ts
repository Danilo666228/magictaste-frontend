import { api } from '@/shared/api/instance'

interface CreateCategoryParams {
	title: string
}

export type CreateCategoryRequestConfig = RequestConfig<CreateCategoryParams>

export const createCategory = ({ params, config }: CreateCategoryRequestConfig) => api.post('/category', params, config)
