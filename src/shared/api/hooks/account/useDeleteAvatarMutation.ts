import { removeAvatar, RemoveAvatarRequestConfig } from '@/shared/api/request'
import { useMutation } from '@tanstack/react-query'

export const useDeleteAvatarMutation = (settings?: MutationSettings<RemoveAvatarRequestConfig, typeof removeAvatar>) => useMutation({
	mutationKey: ['changeAvatar'],
	mutationFn: () => removeAvatar({ config: { ...settings?.config} }),
	...settings?.options
})