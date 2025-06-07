import { useQuery } from '@tanstack/react-query'

import { getNextLevelLoyaltyAccount } from '@/shared/api/request'

export const useGetNextLevelLoyaltyAccountQuery = (settings?: QuerySettings<typeof getNextLevelLoyaltyAccount>) =>
	useQuery({
		queryKey: ['getNextLevelLoyaltyAccount'],
		queryFn: () => getNextLevelLoyaltyAccount({ config: settings?.config }),
		...settings?.options
	})
