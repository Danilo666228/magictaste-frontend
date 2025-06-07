import { getPopularCategory } from '../../request'
import { useQuery } from '@tanstack/react-query'

export const useGetPopularCategory = (settings?: QuerySettings<typeof getPopularCategory>) =>
	useQuery({
		queryKey: ['popularCategory'],
		queryFn: () => getPopularCategory({ config: settings?.config }),
		...settings?.options
	})
