import { api } from '@/shared/api/instance'
import { Account } from '@/shared/api/types'

export type GetProfileRequestConfig = RequestConfig

export const getProfile = (requestConfig?: GetProfileRequestConfig) => api.get<Account>('/profile', requestConfig?.config)
