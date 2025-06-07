import { getIngredients } from '@/shared/api/request'
import { useQuery } from '@tanstack/react-query'

export const useGetIngredientsQuery = (settings?: QuerySettings<typeof getIngredients>) =>
	useQuery({
		queryKey: ['getIngredients', settings?.config?.params],
		queryFn: () => getIngredients({ config: settings?.config }),
		...settings?.options
	})
