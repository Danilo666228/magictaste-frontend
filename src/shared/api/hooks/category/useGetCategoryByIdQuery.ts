import { useQuery } from '@tanstack/react-query'

import { GetCategoryByIdParams, getCategoryById } from '@/shared/api/request'

export const useGetCategoryByIdQuery = (params: GetCategoryByIdParams, settings?: QuerySettings<typeof getCategoryById>) =>
	useQuery({
		queryKey: ['getCategoryById'],
		queryFn: () => getCategoryById({ params, config: settings?.config }),
		...settings?.options
	})
