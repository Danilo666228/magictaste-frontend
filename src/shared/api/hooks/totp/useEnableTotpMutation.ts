import { useMutation } from '@tanstack/react-query'

import { EnableTotpRequestConfig, enableTotp } from '../../request'

export const useEnableTotpMutation = (settings?: MutationSettings<EnableTotpRequestConfig, typeof enableTotp>) =>
	useMutation({
		mutationKey: ['enableTotp'],
		mutationFn: ({ params, config }) => enableTotp({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
