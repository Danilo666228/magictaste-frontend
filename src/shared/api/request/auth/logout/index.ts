import { api } from '@/shared/api/instance'

export type LogoutRequestConfig = RequestConfig

export const logout = (requestConfig?: LogoutRequestConfig) => api.delete('/auth/logout', requestConfig?.config)
