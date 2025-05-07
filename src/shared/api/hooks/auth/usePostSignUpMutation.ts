import { useMutation } from '@tanstack/react-query'

import { SignUpRequestConfig, signUp } from '@/shared/api/request'

export const usePostSignUpMutation = (settings?: MutationSettings<SignUpRequestConfig, typeof signUp>) =>
	useMutation({
		mutationKey: ['signUp'],
		mutationFn: ({ params, config }) => signUp({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
