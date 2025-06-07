import { getCart } from '@/shared/api/request'
import { useQuery } from '@tanstack/react-query'

export const useGetCartQuery = (settings?: QuerySettings<typeof getCart>) =>
	useQuery({
		queryKey: ['getCart'],
		queryFn: () => getCart({ config: settings?.config }),
		...settings?.options
	})
