import { api } from '@/shared/api/instance'
import { Favorite } from '@/shared/api/types'

export type GetFavoriteProductsRequestConfig = RequestConfig

export const getFavoriteProducts = (requestConfig?: GetFavoriteProductsRequestConfig) =>
	api.get<Favorite[]>('/favorite/all', requestConfig?.config)
