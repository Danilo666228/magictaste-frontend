import { api } from '@/shared/api/instance'

export type ToggleFavoriteProductRequestConfig = RequestConfig

export const toggleFavoriteProduct = (requestConfig?: ToggleFavoriteProductRequestConfig) =>
	api.post('/favorite/toggle', null, requestConfig?.config)
