import { useQuery } from '@tanstack/react-query'

import { getIngredientsByCategory, IngredientsByCategoryParams } from '@/shared/api/request'

export const useGetIngredientByCategoryQuery = (params: IngredientsByCategoryParams, settings?: QuerySettings<typeof getIngredientsByCategory>) =>
	useQuery({
		queryKey: ['getIngredientsByCategory', params],
		queryFn: () => getIngredientsByCategory({ params, config: { ...settings?.config } }),
		enabled: !!params.categoryId,
		...settings?.options
	})
