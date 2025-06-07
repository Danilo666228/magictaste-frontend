import { PasswordRecoveryRequestConfig, passwordRecovery } from '../../request/auth/passwordRecovery'
import { useMutation } from '@tanstack/react-query'

export const usePasswordRecoveryMutation = (settings?: MutationSettings<PasswordRecoveryRequestConfig, typeof passwordRecovery>) =>
	useMutation({
		mutationKey: ['password-recovery'],
		mutationFn: ({ params, config }) => passwordRecovery({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
