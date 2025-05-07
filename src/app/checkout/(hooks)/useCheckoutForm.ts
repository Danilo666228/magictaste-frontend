import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { useCart } from '@/hooks/useCart'
import { useFormPersist } from '@/hooks/useFormPersist'

import { TypeCheckoutSchema, checkoutSchema } from '@/schemas/checkout/checkout'

import { useOrderStore } from '@/store/useOrderStore'

import { usePostOrderMutation } from '@/shared/api/hooks/order/usePostOrderMutation'

import { ROUTE } from '@/config/route.config'

export function useCheckoutForm() {
	const { clearCart } = useCart()

	const router = useRouter()
	const { items, resetOrder, total, deliveryPrice } = useOrderStore()
	const { mutate: createOrder, isPending } = usePostOrderMutation({
		options: {
			onSuccess: async ({ data }) => {
				const paymentMethod = form.getValues('paymentMethod')

				if (paymentMethod === 'CASH') {
					router.push(ROUTE.thanks)
					clearCart()
					resetOrder()
				}
				if (paymentMethod === 'CARD') {
					router.push(data.confirmation.confirmation_url)
					resetOrder()
					return
				}

				// if (deliveryType === 'COURIER' || (deliveryType === 'PICKUP' && paymentMethod === 'CARD')) {
				// 	router.push(data.confirmation.confirmation_url)
				// 	resetOrder()
				// 	return
				// }

				// if (deliveryType === 'PICKUP' && paymentMethod === 'CASH') {
				// 	router.push(ROUTE.thanks)
				// 	clearCart()
				// 	resetOrder()
				// }
			}
		}
	})
	const form = useForm<TypeCheckoutSchema>({
		mode: 'onChange',
		resolver: zodResolver(checkoutSchema),
		defaultValues: {
			lastName: '',
			firstName: '',
			email: '',
			phone: '',
			deliveryAddressId: '',
			deliveryAddress: {
				city: '',
				street: '',
				house: '',
				flat: ''
			},
			paymentMethod: 'CARD',
			deliveryType: 'PICKUP',
			comment: ''
		}
	})

	const formPersist = useFormPersist('checkoutForm', {
		watch: form.watch,
		setValue: form.setValue,
		storage: window.localStorage,
		reset: form.reset,
		exclude: ['']
	})

	function onSubmit(data: TypeCheckoutSchema) {
		createOrder({
			params: {
				firstName: data.firstName,
				deliveryType: data.deliveryType,
				paymentMethod: data.paymentMethod,
				lastName: data.lastName,
				email: data.email ?? '',
				phone: data.phone,
				totalPrice: total + deliveryPrice,
				deliveryAddressId: data.deliveryAddressId,
				deliveryAddress: data.deliveryAddress
					? {
							city: data.deliveryAddress.city ?? null,
							street: data.deliveryAddress.street ?? null,
							house: data.deliveryAddress.house ?? null,
							flat: data.deliveryAddress.flat ?? null
						}
					: undefined,
				items: items.map(item => ({
					productId: item.product.id,
					quantity: item.quantity,
					price: item.product.price,
					productTitle: item.product.title,
					productImage: item.product.imageUrl,
					productDescription: item.product.description
				}))
			}
		})
		// formPersist.clear()
	}

	return { form, formPersist, onSubmit, isPending }
}
