import { api } from '@/shared/api/instance'

export type VerificationRequestConfig = RequestConfig

export const verification = (requestConfig?: VerificationRequestConfig) => api.get('/auth/verification', requestConfig?.config)
