import { api } from '@/shared/api/instance'
import { Ingredient } from '@/shared/api/types'

export type GetIngredientsRequestConfig = RequestConfig

export const getIngredients = (requestConfig: GetIngredientsRequestConfig) => api.get<Ingredient[]>('/ingredients', requestConfig.config)
