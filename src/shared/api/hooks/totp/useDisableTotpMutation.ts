import { DisableTotpRequestConfig, disableTotp } from '../../request'
import { useMutation } from '@tanstack/react-query'

export const useDisableTotpMutation = (settings?: MutationSettings<DisableTotpRequestConfig, typeof disableTotp>) =>
	useMutation({
		mutationKey: ['disableTotp'],
		mutationFn: ({ config }) => disableTotp({ config: { ...settings?.config, ...config } }),
		...settings?.options
	})
