import { NewPasswordParams, NewPasswordRequestConfig, resetPassword } from '../../request/auth/new-password'
import { useMutation } from '@tanstack/react-query'

export const useResetPasswordMutation = (settings?: MutationSettings<NewPasswordRequestConfig, typeof resetPassword>) =>
	useMutation({
		mutationKey: ['new-password'],
		mutationFn: ({ params, config }) => resetPassword({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
