import { useQuery } from '@tanstack/react-query'

import { getPopularCategory } from '../../request'

export const useGetPopularCategory = (settings?: QuerySettings<typeof getPopularCategory>) =>
	useQuery({
		queryKey: ['popularCategory'],
		queryFn: () => getPopularCategory({ config: settings?.config }),
		...settings?.options
	})
