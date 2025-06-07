import { verification } from '@/shared/api/request'
import { useQuery } from '@tanstack/react-query'

export const useGetVerificationQuery = (settings?: QuerySettings<typeof verification>) =>
	useQuery({
		queryKey: ['verification-email'],
		queryFn: () => verification({ config: settings?.config }),
		...settings?.options
	})
