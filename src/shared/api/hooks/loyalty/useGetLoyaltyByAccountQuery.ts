import { getLoyaltyByAccount } from '@/shared/api/request'
import { useQuery } from '@tanstack/react-query'

export const useGetLoyaltyByAccountQuery = (settings?: QuerySettings<typeof getLoyaltyByAccount>) =>
	useQuery({
		queryKey: ['getLoyaltyByAccountId'],
		queryFn: () => getLoyaltyByAccount({ config: settings?.config }),
		...settings?.options
	})
