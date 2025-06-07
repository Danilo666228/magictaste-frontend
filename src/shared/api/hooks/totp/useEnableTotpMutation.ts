import { EnableTotpRequestConfig, enableTotp } from '../../request'
import { useMutation } from '@tanstack/react-query'

export const useEnableTotpMutation = (settings?: MutationSettings<EnableTotpRequestConfig, typeof enableTotp>) =>
	useMutation({
		mutationKey: ['enableTotp'],
		mutationFn: ({ params, config }) => enableTotp({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
