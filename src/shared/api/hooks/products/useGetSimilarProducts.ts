import { getSimilarProduct } from '../../request'
import { useQuery } from '@tanstack/react-query'

export const useGetSimilarProducts = (settings?: QuerySettings<typeof getSimilarProduct>) =>
	useQuery({
		queryKey: ['getSimilarProduct', settings?.config?.params],
		queryFn: () => getSimilarProduct({ config: settings?.config }),
		...settings?.options
	})
