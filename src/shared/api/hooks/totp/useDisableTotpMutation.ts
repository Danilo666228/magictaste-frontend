import { useMutation } from '@tanstack/react-query'

import { DisableTotpRequestConfig, disableTotp } from '../../request'

export const useDisableTotpMutation = (settings?: MutationSettings<DisableTotpRequestConfig, typeof disableTotp>) =>
	useMutation({
		mutationKey: ['disableTotp'],
		mutationFn: ({ config }) => disableTotp({ config: { ...settings?.config, ...config } }),
		...settings?.options
	})
