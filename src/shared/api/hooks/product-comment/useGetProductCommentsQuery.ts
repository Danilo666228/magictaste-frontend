import { useQuery } from '@tanstack/react-query'

import { getProductComments } from '@/shared/api/request'

export const useGetProductCommentsQuery = (settings?: QuerySettings<typeof getProductComments>) =>
	useQuery({
		queryKey: ['getProductComments',settings?.config?.params],
		queryFn: () => getProductComments({ config: settings?.config }),
		...settings?.options
	})
