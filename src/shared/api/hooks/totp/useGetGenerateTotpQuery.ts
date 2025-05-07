import { useQuery } from '@tanstack/react-query'

import { generateQrCode } from '../../request'

export const useGetGenerateTotpQuery = (settings?: QuerySettings<typeof generateQrCode>) =>
	useQuery({
		queryKey: ['generateTotp'],
		queryFn: () => generateQrCode({ config: settings?.config }),
		...settings?.options
	})
