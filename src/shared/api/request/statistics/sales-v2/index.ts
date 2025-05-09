import { api } from '@/shared/api/instance'

export type GetStatisticSaleV2 = RequestConfig

export const getStatisticSaleV2 = (requestConfig: GetStatisticSaleV2) =>
	api.get<{ date: Date; sale: number }[]>('/statistics/sales-v2', requestConfig.config)
