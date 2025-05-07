import { api } from '@/shared/api/instance'

export interface ChangeProductImageParams {
	productId: string
	formData: FormData
}

export type ChangeProductImageRequestConfig = RequestConfig<ChangeProductImageParams>

export const changeProductImage = ({ config, params }: ChangeProductImageRequestConfig) =>
	api.put('/products/change/image', params?.formData, {
		params: { productId: params?.productId },
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		...config
	})
