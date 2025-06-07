import { generateQrCode } from '../../request'
import { useQuery } from '@tanstack/react-query'

export const useGetGenerateTotpQuery = (settings?: QuerySettings<typeof generateQrCode>) =>
	useQuery({
		queryKey: ['generateTotp'],
		queryFn: () => generateQrCode({ config: settings?.config }),
		...settings?.options
	})
