import { GetCategoryByIdParams, getCategoryById } from '@/shared/api/request'
import { useQuery } from '@tanstack/react-query'

export const useGetCategoryByIdQuery = (params: GetCategoryByIdParams, settings?: QuerySettings<typeof getCategoryById>) =>
	useQuery({
		queryKey: ['getCategoryById'],
		queryFn: () => getCategoryById({ params, config: settings?.config }),
		...settings?.options
	})
