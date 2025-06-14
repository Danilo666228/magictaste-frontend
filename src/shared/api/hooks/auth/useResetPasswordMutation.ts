import { useMutation } from '@tanstack/react-query'

import { NewPasswordRequestConfig, resetPassword } from '@/shared/api/request/auth/new-password'

export const useResetPasswordMutation = (settings?: MutationSettings<NewPasswordRequestConfig, typeof resetPassword>) =>
	useMutation({
		mutationKey: ['new-password'],
		mutationFn: ({ params, config }) => resetPassword({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
