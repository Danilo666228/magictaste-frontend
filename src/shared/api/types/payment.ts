export interface PaymentDetails {
	id: string
	status: string
	amount: Amount
	description: string
	recipient: Recipient
	payment_method: PamentMethod
	created_at: string
	confirmation?: Confirmation
	test: boolean
	paid: boolean
	refundable: boolean
	metadata: Metadata
}

export interface Metadata {
	orderId: string
}

export interface Confirmation {
	type: string
	return_url: string
	confirmation_url: string
}

export interface PamentMethod {
	type: string
	id: string
	saved: boolean
	status: string
}

export interface Recipient {
	account_id: string
	gateway_id: string
}

export interface Amount {
	value: string
	currency: string
}

export const paymentMethod = {
	CARD: 'CARD',
	CASH: 'CASH'
} as const
export const deliveryType = {
	COURIER: 'COURIER',
	PICKUP: 'PICKUP'
} as const

export type PaymentMethod = (typeof paymentMethod)[keyof typeof paymentMethod]
export type DeliveryType = (typeof deliveryType)[keyof typeof deliveryType]
