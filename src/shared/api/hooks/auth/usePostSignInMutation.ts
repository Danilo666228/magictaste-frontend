import { useMutation } from '@tanstack/react-query'

import { SignInRequestConfig, signIn } from '@/shared/api/request'

export const usePostSignInMutation = (settngs?: MutationSettings<SignInRequestConfig, typeof signIn>) =>
	useMutation({
		mutationKey: ['signIn'],
		mutationFn: ({ params, config }) => signIn({ params, config: { ...settngs?.config, ...config } }),
		...settngs?.options
	})
