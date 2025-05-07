import { api } from '@/shared/api/instance'
import { Ingredient } from '@/shared/api/types'

export interface IngredientsByCategoryParams {
	categoryId: string | undefined
}

export type IngredientsByCategoryConfig = RequestConfig<IngredientsByCategoryParams>

export const getIngredientsByCategory = ({ params, config }: IngredientsByCategoryConfig) =>
	api.get<Ingredient[]>(`/ingredients/by-category/${params?.categoryId}`, config)
