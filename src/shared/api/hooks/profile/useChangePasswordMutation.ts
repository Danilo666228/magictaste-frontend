import { useMutation } from '@tanstack/react-query'

import { ChangePasswordRequestConfig, changePassword } from '../../request/profile'

export const useChangePasswordMutation = (settings?: MutationSettings<ChangePasswordRequestConfig, typeof changePassword>) =>
	useMutation({
		mutationKey: ['changePassword'],
		mutationFn: ({ params, config }) => changePassword({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
