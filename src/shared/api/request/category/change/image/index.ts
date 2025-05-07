import { api } from '@/shared/api/instance'

export interface ChangeCategoryImageParams {
	categoryId: string
	formData: FormData
}

export type ChangeCategoryImageRequestConfig = RequestConfig<ChangeCategoryImageParams>

export const changeCategoryImage = ({ config, params }: ChangeCategoryImageRequestConfig) =>
	api.put('/category/change/image', params?.formData, {
		params: { categoryId: params?.categoryId },
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		...config
	})
