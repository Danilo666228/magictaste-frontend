import { useQuery } from '@tanstack/react-query'

import { getCart } from '@/shared/api/request'

export const useGetCartQuery = (settings?: QuerySettings<typeof getCart>) =>
	useQuery({
		queryKey: ['getCart'],
		queryFn: () => getCart({ config: settings?.config }),
		...settings?.options
	})
