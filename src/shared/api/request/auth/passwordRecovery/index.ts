import { api } from '@/shared/api/instance'

export interface PasswordRecoveryParams {
	password: string
	passwordRepeat: string
}

export type PasswordRecoveryRequestConfig = RequestConfig<PasswordRecoveryParams>

export const passwordRecovery = ({ params, config }: PasswordRecoveryRequestConfig) => {
	return api.post('/account/new-password', params, config)
}
