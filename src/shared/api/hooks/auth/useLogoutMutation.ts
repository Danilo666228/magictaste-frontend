import { useMutation } from '@tanstack/react-query'

import { LogoutRequestConfig, logout } from '@/shared/api/request'

export const useLogoutMutation = (settings?: MutationSettings<LogoutRequestConfig, typeof logout>) =>
	useMutation({
		mutationKey: ['logout'],
		mutationFn: ({ config }) => logout({ config: { ...settings?.config, ...config } }),
		...settings?.options
	})
