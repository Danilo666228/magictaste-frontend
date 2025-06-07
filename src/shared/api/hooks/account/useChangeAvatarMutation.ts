import { ChangeAvatarRequestConfig, changeAvatar } from '@/shared/api/request'
import { useMutation } from '@tanstack/react-query'

export const useChangeAvatarMutation = (settings?: MutationSettings<ChangeAvatarRequestConfig, typeof changeAvatar>) =>
	useMutation({
		mutationKey: ['changeAvatar'],
		mutationFn: ({ params, config }) => changeAvatar({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
