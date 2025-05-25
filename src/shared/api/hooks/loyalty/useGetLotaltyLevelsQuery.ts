import { useQuery } from '@tanstack/react-query'

import { getLoyaltyLevels } from '@/shared/api/request'

export const useGetLoyaltyLevelsQuery = (settings?: QuerySettings<typeof getLoyaltyLevels>) =>
	useQuery({
		queryKey: ['getLoyaltyLevels'],
		queryFn: () => getLoyaltyLevels({ config: settings?.config }),
		...settings?.options
	})
