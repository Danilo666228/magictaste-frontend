import { api } from '@/shared/api/instance'

interface UpdateIngredientParams {
	title: string
}
export type UpdateIngredientRequestConfig = RequestConfig<UpdateIngredientParams>

export const updateIngredient = ({ params, config }: UpdateIngredientRequestConfig) =>
	api.put(`/ingredients`, params, config)
