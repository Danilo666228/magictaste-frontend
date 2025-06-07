import { getAccounts } from '@/shared/api/request/accounts'
import { useQuery } from '@tanstack/react-query'

export const useGetAccountsQuery = (settings?: QuerySettings<typeof getAccounts>) =>
	useQuery({
		queryKey: ['getAccounts'],
		queryFn: () => getAccounts({ config: settings?.config }),
		...settings?.options
	})
