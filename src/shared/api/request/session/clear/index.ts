import { api } from '@/shared/api/instance'

export type ClearSessionConfig = RequestConfig

export const clearSession = (requestConfig?: ClearSessionConfig) => api.delete('/session/clear', requestConfig?.config)
