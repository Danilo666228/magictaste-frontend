import { api } from '@/shared/api/instance'

export type DeleteSessionConfig = RequestConfig

export const deleteSession = (requestConfig : DeleteSessionConfig) => api.delete('/session', requestConfig.config)
