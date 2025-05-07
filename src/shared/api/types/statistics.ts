import { OrderStatus } from './order'
import { PaymentMethod } from './payment'

export interface DashboardStatisticsData {
	sales: {
		totalSales: number
		salesAmount: number
		period: string
		comparison: {
			previousSales: number
			previousAmount: number
			salesPercentChange: number
			amountPercentChange: number
			salesTrend: 'up' | 'down'
			amountTrend: 'up' | 'down'
		} | null
	}
	topProducts: {
		id: string
		title: string
		imageUrl: string | null
		totalQuantity: number
		totalRevenue: number
	}[]
	customers: {
		totalCustomers: number
		newCustomers: number
		activeCustomers: number
		period: string
		comparison: {
			previousNewCustomers: number
			previousActiveCustomers: number
			newCustomersPercentChange: number
			activeCustomersPercentChange: number
			newCustomersTrend: 'up' | 'down'
			activeCustomersTrend: 'up' | 'down'
		}
	}
	orderStatuses: {
		[key in keyof typeof OrderStatus]: number
	}
	paymentMethods: {
		method: PaymentMethod
		count: number
		total: number
	}[]
	categories: {
		categoryId: string
		categoryTitle: string
		productCount: number
		totalSales: number
	}[]
	recentPurchases: {
		orderId: string
		orderDate: string
		orderTotal: number
		user: {
			id: string
			userName: string
			email: string
			picture: string
		}
		products: {
			id: string
			title: string
			image: string
			quantity: number
			price: number
		}[]
		mainProduct: {
			id: string
			title: string
			image: string
		} | null
		additionalProductsCount: number
	}[]
	activityFeed: {
		type: 'PURCHASE' | 'NEW_USER' | 'REVIEW'
		date: string
		user: {
			id: string
			userName: string
			email: string
			picture: string
		}
		orderId?: string
		orderTotal?: number
		mainProduct?: {
			id: string
			title: string
			image: string
		} | null
		additionalProductsCount?: number
		product?: {
			id: string
			title: string
			image: string
		}
		rating?: number
		comment?: string
	}[]
}
