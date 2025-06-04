import { useMutation } from '@tanstack/react-query'

import { RemoveAvatarRequestConfig, removeAvatar } from '@/shared/api/request'

export const useDeleteAvatarMutation = (settings?: MutationSettings<RemoveAvatarRequestConfig, typeof removeAvatar>) =>
	useMutation({
		mutationKey: ['changeAvatar'],
		mutationFn: () => removeAvatar({ config: { ...settings?.config } }),
		...settings?.options
	})
