import { useQuery } from '@tanstack/react-query'

import { getAllSession } from '@/shared/api/request'

export const useGetAllSessionsQuery = (settings?: QuerySettings<typeof getAllSession>) =>
	useQuery({
		queryKey: ['getAllSession'],
		queryFn: () => getAllSession({ config: settings?.config }),
		...settings?.options
	})
