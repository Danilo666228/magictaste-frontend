import { api } from '@/shared/api/instance'
import { LoyaltyLevel } from '@/shared/api/types/loyalty'

type GetLotaltyLevels = RequestConfig

export const getLoyaltyLevels = (requestConfig?: GetLotaltyLevels) => api.get<LoyaltyLevel[]>('/loyalty/levels', requestConfig?.config)
