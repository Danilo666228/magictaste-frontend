import { useQuery } from '@tanstack/react-query'

import { getIngredients } from '@/shared/api/request'

export const useGetIngredientsQuery = (settings?: QuerySettings<typeof getIngredients>) =>
	useQuery({
		queryKey: ['getIngredients', settings?.config?.params],
		queryFn: () => getIngredients({ config: settings?.config }),
		...settings?.options
	})
