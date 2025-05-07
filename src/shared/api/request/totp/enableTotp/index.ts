import { api } from '@/shared/api/instance'

interface EnableTotpParams {
	pin: string
	secret: string
}
export type EnableTotpRequestConfig = RequestConfig<EnableTotpParams>

export const enableTotp = ({ params, config }: EnableTotpRequestConfig) => api.post('/totp/enable', params, config)
