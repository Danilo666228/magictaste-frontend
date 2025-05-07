import { DeliveryAddress } from './delivery-address'
import { DeliveryType, PaymentMethod } from './payment'
import { Product } from './product'

export interface CreateOrderItem {
	productId: string
	quantity: number
	price: number
	productTitle: string
	productImage: string
	productDescription: string
}

export interface Order {
	id: string
	status: (typeof OrderStatus)[keyof typeof OrderStatus]
	firstName: string
	lastName: string
	email?: string
	phone: string
	deliveryAddressId?: string
	deliveryAddress: DeliveryAddress
	total: number
	createdAt: string
	updatedAt: string
	items: OrderItem[]
	deliveryType: DeliveryType
	paymentMethod: PaymentMethod
}
export interface OrderItem {
	id: string
	quantity: number
	price: number
	productTitle: string
	productDescription: string
	productImageUrl: string
	createdAt: Date
	updatedAt: Date
	product: Product
}

export const OrderStatus = {
	WAITING_FOR_PAYMENT: 'WAITING_FOR_PAYMENT',
	PAYED: 'PAYED',
	CANCELED: 'CANCELED',
	PROCESSING: 'PROCESSING',
	COMPLETED: 'COMPLETED',
	DELIVERING: 'DELIVERING',
	READY_FOR_DELIVERY: 'READY_FOR_DELIVERY',
	RETURNED: 'RETURNED'
} as const

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]
