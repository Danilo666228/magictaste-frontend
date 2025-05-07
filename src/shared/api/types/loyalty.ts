export interface Loyalty {
	id: string
	accountId: string
	achievements: JSON
	lastActivity: Date
	loyaltyLevelId: string
	loyaltyLevel: LoyaltyLevel
	pointsToNextLevel : number
	ordersCount: number
	points: number
	totalSpent: number
	createdAt: Date
	updatedAt: Date
}

export interface LoyaltyLevel {
	id: string
	name: string
	minPoints: number
	bonusPercentage: number
	hasPriorityDelivery: boolean
	hasPersonalManager: boolean
	hasExclusiveAccess: boolean
	additionalBenefits: AdditionalBenefits[]
	createdAt: Date
	updatedAt: Date
}

interface AdditionalBenefits {
	name: string
	description: string
	isActive: boolean
}

export interface LoyaltyTransaction {
	id: string
	accountLoyaltyId: string
	points: number
	type: LoyaltyTransactionType
	orderId?: string | undefined
	description: string
	metadata: Record<string, any>
	createdAt: Date
}

export const LoyaltyTransactionType = {
	REVIEW: 'REVIEW',
	PURCHASE: 'PURCHASE'
} as const
export type LoyaltyTransactionType = (typeof LoyaltyTransactionType)[keyof typeof LoyaltyTransactionType]
