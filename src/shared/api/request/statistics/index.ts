import { api } from '../../instance'
import { DashboardStatisticsData } from '../../types/statistics'

export type GetDashboardStatisticsRequestConfig = RequestConfig

export const getDashboardStatistics = (requestConfig: GetDashboardStatisticsRequestConfig) =>
	api.get<DashboardStatisticsData>('/statistics/dashboard', requestConfig.config)
