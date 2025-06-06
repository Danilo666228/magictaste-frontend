import { api } from '@/shared/api/instance'
import { LoyaltyLevel } from '@/shared/api/types/loyalty'

export type GetNextLevelLoyaltyAccount = RequestConfig

export const getNextLevelLoyaltyAccount = (requestConfig: GetNextLevelLoyaltyAccount) =>
	api.get<LoyaltyLevel>('/loyalty/next-level', requestConfig.config)
