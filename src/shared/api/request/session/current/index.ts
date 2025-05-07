import { api } from '@/shared/api/instance'
import { Session } from '@/shared/api/types'

export type GetSessionCurrentRequestConfig = RequestConfig

interface GetCurrentSessionResponse {
	id: string
	session: Session
}

export const getCurrentSession = (requestConfig?: GetSessionCurrentRequestConfig) =>
	api.get<GetCurrentSessionResponse>('/session/current', requestConfig?.config)
