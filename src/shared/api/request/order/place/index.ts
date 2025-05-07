import { api } from '@/shared/api/instance'
import { CreateOrderItem } from '@/shared/api/types'
import { DeliveryType, PaymentMethod } from '@/shared/api/types/payment'

export interface PlaceOrderParams {
	lastName: string
	firstName: string
	email: string
	phone: string
	deliveryAddressId?: string | null
	deliveryAddress?: {
		city: string | null
		street: string | null
		house: string | null
		flat: string | null
	} | null
	items: CreateOrderItem[]
	paymentMethod: PaymentMethod
	deliveryType: DeliveryType
	totalPrice: number
}

export interface CreateOrderResponse {
	confirmation: {
		confirmation_url: string
	}
}

export type CreateOrderConfig = RequestConfig<PlaceOrderParams>

export const createOrder = ({ params, config }: CreateOrderConfig) => api.post<CreateOrderResponse>('/orders/place', params, config)
