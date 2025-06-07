import { IngredientsByCategoryParams, getIngredientsByCategory } from '@/shared/api/request'
import { useQuery } from '@tanstack/react-query'

export const useGetIngredientByCategoryQuery = (params: IngredientsByCategoryParams, settings?: QuerySettings<typeof getIngredientsByCategory>) =>
	useQuery({
		queryKey: ['getIngredientsByCategory', params],
		queryFn: () => getIngredientsByCategory({ params, config: { ...settings?.config } }),
		enabled: !!params.categoryId,
		...settings?.options
	})
