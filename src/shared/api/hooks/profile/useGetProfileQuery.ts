import { getProfile } from '@/shared/api/request'
import { useQuery } from '@tanstack/react-query'

export const useGetProfileQuery = (settings?: QuerySettings<typeof getProfile>) =>
	useQuery({
		queryKey: ['getProfile'],
		queryFn: () => getProfile({ config: settings?.config }),
		...settings?.options
	})
