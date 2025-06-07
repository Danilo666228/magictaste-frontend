import { getNextLevelLoyaltyAccount } from '@/shared/api/request'
import { useQuery } from '@tanstack/react-query'

export const useGetNextLevelLoyaltyAccountQuery = (settings?: QuerySettings<typeof getNextLevelLoyaltyAccount>) =>
	useQuery({
		queryKey: ['getNextLevelLoyaltyAccount'],
		queryFn: () => getNextLevelLoyaltyAccount({ config: settings?.config }),
		...settings?.options
	})
