import { api } from '@/shared/api/instance'

export interface ChangeIngredientImageParams {
	ingredientId: string
	formData: FormData
}

export type ChangeIngredientImageRequestConfig = RequestConfig<ChangeIngredientImageParams>

export const changeIngredientImage = ({ config, params }: ChangeIngredientImageRequestConfig) =>
	api.put('/ingredients/change/image', params?.formData, {
		params: { ingredientId: params?.ingredientId },
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		...config
	})
