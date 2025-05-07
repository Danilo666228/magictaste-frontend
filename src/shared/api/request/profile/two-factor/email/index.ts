import { api } from '@/shared/api/instance'

export interface UpdateTwoFactorEmailParams {
	isTwoFactorEmailEnabled: boolean
}

export type UpdateTwoFactorEmailRequestConfig = RequestConfig<UpdateTwoFactorEmailParams>

export const updateTwoFactorEmail = ({ params, config }: UpdateTwoFactorEmailRequestConfig) =>
	api.put('/profile/two-factor/email', params, config)
