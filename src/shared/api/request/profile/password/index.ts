import { api } from '@/shared/api/instance'

interface ChangePasswordParams {
	oldPassword: string
	newPassword: string
}

export type ChangePasswordRequestConfig = RequestConfig<ChangePasswordParams>

export const changePassword = ({ params, config }: ChangePasswordRequestConfig) => api.put('/profile/password', params, config)
