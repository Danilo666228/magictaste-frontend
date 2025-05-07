import { api } from '@/shared/api/instance'

export type ChangeAvatarRequestConfig = RequestConfig<{ formData: FormData }>
export const changeAvatar = ({ params, config }: ChangeAvatarRequestConfig) =>
	api.put('/profile/avatar', params?.formData, {
		headers: {
			ContentType: 'multipart/form-data'
		},
		...config
	})
