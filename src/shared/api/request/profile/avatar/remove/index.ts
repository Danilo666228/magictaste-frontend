import { api } from '@/shared/api/instance'

export type RemoveAvatarRequestConfig = RequestConfig

export const removeAvatar = (requestConfig?: RemoveAvatarRequestConfig) => api.delete('/profile/avatar', requestConfig?.config)
