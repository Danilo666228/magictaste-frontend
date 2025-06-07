import { useMutation } from '@tanstack/react-query'

import { ChangeProfileRequestConfig, changeProfile } from '../../request/profile'

export const useChangeProfileMutation = (settings?: MutationSettings<ChangeProfileRequestConfig, typeof changeProfile>) =>
	useMutation({
		mutationKey: ['changeProfile'],
		mutationFn: ({ params, config }) => changeProfile({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
