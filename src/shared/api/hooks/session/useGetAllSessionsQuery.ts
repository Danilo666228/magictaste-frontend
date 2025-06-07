import { getAllSession } from '@/shared/api/request'
import { useQuery } from '@tanstack/react-query'

export const useGetAllSessionsQuery = (settings?: QuerySettings<typeof getAllSession>) =>
	useQuery({
		queryKey: ['getAllSession'],
		queryFn: () => getAllSession({ config: settings?.config }),
		...settings?.options
	})
