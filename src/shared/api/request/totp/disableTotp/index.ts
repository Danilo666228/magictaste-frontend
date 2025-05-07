import { api } from '@/shared/api/instance'

export type DisableTotpRequestConfig = RequestConfig

export const disableTotp = (requestConfig?: DisableTotpRequestConfig) => api.post('/totp/disable', requestConfig?.config)
