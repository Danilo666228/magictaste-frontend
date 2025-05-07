import { api } from '@/shared/api/instance'
import { Loyalty, LoyaltyTransaction } from '@/shared/api/types/loyalty'

export type GetLoyaltyByAccountRequestConfig = RequestConfig

interface GetLotaltyByAccountResponse extends Loyalty {
	transactions: LoyaltyTransaction[]
}

export const getLoyaltyByAccount = (requestConfig: GetLoyaltyByAccountRequestConfig) =>
	api.get<GetLotaltyByAccountResponse>('/loyalty/account', requestConfig.config)
