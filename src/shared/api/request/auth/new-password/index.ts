import { api } from '@/shared/api/instance'

export interface NewPasswordParams {
	email: string
}

export type NewPasswordRequestConfig = RequestConfig<NewPasswordParams>

export const resetPassword = ({ params, config }: NewPasswordRequestConfig) => {
	return api.post('/account/reset-password', params, config)
}
