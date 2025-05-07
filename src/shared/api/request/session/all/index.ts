import { api } from '@/shared/api/instance'
import { Session } from '@/shared/api/types'

export type GetAllSessionConfig = RequestConfig

export const getAllSession = (requestConfig?: GetAllSessionConfig) => api.get<Session[]>('/session', requestConfig?.config)
