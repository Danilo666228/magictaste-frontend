import { useMutation } from '@tanstack/react-query'

import { UpdateTwoFactorEmailRequestConfig, updateTwoFactorEmail } from '../../request/profile'

export const useChangeTwoFactorEmailMutation = (
	settings?: MutationSettings<UpdateTwoFactorEmailRequestConfig, typeof updateTwoFactorEmail>
) =>
	useMutation({
		mutationKey: ['updateTwoFactorEmail'],
		mutationFn: ({ params, config }) => updateTwoFactorEmail({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
