import { UpdateTwoFactorEmailRequestConfig, updateTwoFactorEmail } from '../../request/profile'
import { useMutation } from '@tanstack/react-query'

export const useChangeTwoFactorEmailMutation = (settings?: MutationSettings<UpdateTwoFactorEmailRequestConfig, typeof updateTwoFactorEmail>) =>
	useMutation({
		mutationKey: ['updateTwoFactorEmail'],
		mutationFn: ({ params, config }) => updateTwoFactorEmail({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
