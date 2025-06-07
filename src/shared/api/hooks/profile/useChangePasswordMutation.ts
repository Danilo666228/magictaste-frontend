import { ChangePasswordRequestConfig, changePassword } from '../../request/profile'
import { useMutation } from '@tanstack/react-query'

export const useChangePasswordMutation = (settings?: MutationSettings<ChangePasswordRequestConfig, typeof changePassword>) =>
	useMutation({
		mutationKey: ['changePassword'],
		mutationFn: ({ params, config }) => changePassword({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
