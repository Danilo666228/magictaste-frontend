import { api } from '@/shared/api/instance'
import { Account } from '@/shared/api/types'

export type GetAccountsRequestConfig = RequestConfig

export const getAccounts = (requestConfig: GetAccountsRequestConfig) => api.get<Account[]>('/accounts', requestConfig.config)
