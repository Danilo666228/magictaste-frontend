import { useQuery } from '@tanstack/react-query'

import { verification } from '@/shared/api/request'

export const useGetVerificationQuery = (settings?: QuerySettings<typeof verification>) =>
	useQuery({
		queryKey: ['verification-email'],
		queryFn: () => verification({ config: settings?.config }),
		...settings?.options
	})
