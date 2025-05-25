import { api } from '@/shared/api/instance'

type GetProductsStatisticsRequestConfig = RequestConfig

interface GetProductsStatisticsResponse {
	total: number
	totalSales: number
	avarageRating: number
}

export const getProductsStatistics = (requestConfig?: GetProductsStatisticsRequestConfig) =>
	api.get<GetProductsStatisticsResponse>('/statistics/products', requestConfig?.config)
