import { useQuery } from '@tanstack/react-query'

import { getAccounts } from '@/shared/api/request/accounts'

export const useGetAccountsQuery = (settings?: QuerySettings<typeof getAccounts>) =>
	useQuery({
		queryKey: ['getAccounts'],
		queryFn: () => getAccounts({ config: settings?.config }),
		...settings?.options
	})
