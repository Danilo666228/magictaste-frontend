import { useQuery } from '@tanstack/react-query'
import { getSimilarProduct } from '../../request'

export const useGetSimilarProducts = (settings?: QuerySettings<typeof getSimilarProduct>) => useQuery({
	queryKey: ['getSimilarProduct', settings?.config?.params],
	queryFn: () => getSimilarProduct({ config: settings?.config }),
	...settings?.options
})