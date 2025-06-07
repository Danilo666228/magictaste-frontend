import { getCurrentSession } from '@/shared/api/request'
import { useQuery } from '@tanstack/react-query'

export const useGetCurrentSessionQuery = (settings?: QuerySettings<typeof getCurrentSession>) =>
	useQuery({
		queryKey: ['getCurrentSession'],
		queryFn: () => getCurrentSession({ config: settings?.config }),
		...settings?.options
	})
