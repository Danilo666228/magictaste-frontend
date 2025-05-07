import { api } from '@/shared/api/instance'

interface CreateIngredientParams {
	title: string
}
export type CreateIngredientRequestConfig = RequestConfig<CreateIngredientParams>

export const createIngredient = ({ params, config }: CreateIngredientRequestConfig) => api.post('/ingredients', params, config)
