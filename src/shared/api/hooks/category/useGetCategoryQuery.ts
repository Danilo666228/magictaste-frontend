import { getCategory } from '@/shared/api/request'
import { useQuery } from '@tanstack/react-query'

export const useGetCategoryQuery = (settings?: QuerySettings<typeof getCategory>) =>
	useQuery({
		queryKey: ['getCategory', settings?.config?.params],
		queryFn: () => getCategory({ config: settings?.config }),
		...settings?.options
	})
