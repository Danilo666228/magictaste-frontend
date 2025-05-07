import { api } from '@/shared/api/instance'

export type DeleteIngredientRequestConfig = RequestConfig

export const deleteIngredient = ({ config }: DeleteIngredientRequestConfig) => api.delete('/ingredients', config)
