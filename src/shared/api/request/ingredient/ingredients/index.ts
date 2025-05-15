import { api } from '@/shared/api/instance'
import { Ingredient } from '@/shared/api/types'

export type GetIngredientsRequestConfig = RequestConfig

interface GetInredientsResponse {
	ingredients: Ingredient[]
	total: number
}

export const getIngredients = (requestConfig: GetIngredientsRequestConfig) => api.get<GetInredientsResponse>('/ingredients', requestConfig.config)
