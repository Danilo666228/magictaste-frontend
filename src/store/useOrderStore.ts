import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { OrderItem } from '@/shared/api/types'
import { DeliveryType } from '@/shared/api/types/payment'

export type OrderStep = 'user' | 'delivery' | 'payment'

interface OrderStore {
	currentStep: OrderStep
	items: OrderItem[]
	deliveryType: DeliveryType
	deliveryPrice: number
	total: number
	discount: number

	setItems: (items: OrderItem[]) => void
	setDeliveryType: (deliveryType: DeliveryType) => void
	setDeliveryPrice: (deliveryPrice: number) => void
	setTotal: (total: number) => void
	setDiscount: (discount: number) => void
	setCurrentStep: (step: OrderStep) => void
	nextStep: () => void
	resetOrder: () => void
}

const initialState: OrderStore = {
	currentStep: 'user',
	deliveryPrice: 0,
	items: [],
	deliveryType: 'PICKUP',
	total: 0,
	discount: 0,
	setItems: items => {},
	setDeliveryType: (deliveryType: DeliveryType) => {},
	setDeliveryPrice: (deliveryPrice: number) => {},
	setTotal: (total: number) => {},
	setDiscount: (discount: number) => {},
	setCurrentStep: (step: OrderStep) => {},
	nextStep: () => {},
	resetOrder: () => {}
}

export const useOrderStore = create<OrderStore>()(
	persist(
		(set, get) => ({
			...initialState,
			setItems: (items: OrderItem[]) =>
				set({
					items,
					total: items.reduce((acc, item) => acc + item.price * item.quantity, 0) - get().discount
				}),
			setDiscount: (discount: number) => set({ discount }),
			setDeliveryPrice: (deliveryPrice: number) => set({ deliveryPrice }),
			setDeliveryType: (deliveryType: DeliveryType) => set({ deliveryType }),
			setTotal: (total: number) => set({ total }),
			setCurrentStep: (step: OrderStep) => set({ currentStep: step }),
			nextStep: () => {
				const { currentStep } = get()
				const steps: OrderStep[] = ['user', 'delivery', 'payment']
				const currentIndex = steps.indexOf(currentStep)

				if (currentIndex < steps.length - 1) {
					set({ currentStep: steps[currentIndex + 1] })
				}
			},
			resetOrder: () => set(initialState)
		}),
		{
			name: 'order'
		}
	)
)
