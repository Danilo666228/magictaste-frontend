import { useQuery } from '@tanstack/react-query'

import { getDashboardStatistics } from '../../request'

export const useGetDashboardStatistics = (settings?: QuerySettings<typeof getDashboardStatistics>) =>
	useQuery({
		queryKey: ['getDashboardStatistics', settings?.config?.params],
		queryFn: () => getDashboardStatistics({ config: settings?.config }),
		...settings?.options
	})
