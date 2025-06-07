import { useMutation } from '@tanstack/react-query'

import { ChangeAvatarRequestConfig, changeAvatar } from '@/shared/api/request'

export const useChangeAvatarMutation = (settings?: MutationSettings<ChangeAvatarRequestConfig, typeof changeAvatar>) =>
	useMutation({
		mutationKey: ['changeAvatar'],
		mutationFn: ({ params, config }) => changeAvatar({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
