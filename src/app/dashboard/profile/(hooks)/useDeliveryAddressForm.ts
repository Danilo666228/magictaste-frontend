import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useModal } from '@/components/shared'

import { TypeCreateDeliveryAddressSchema, deliveryAddressSchema } from '@/schemas/delivery-address/delivery-address'

import { usePostDeliveryAddress } from '@/shared/api/hooks/delivery-address/usePostDeliveryAddress'

export const useDeliveryAddressForm = () => {
	const queryClient = useQueryClient()
	const [isShowMap, setIsShowMap] = useState(false)
	const { closeModal } = useModal()

	const {
		mutate: createDeliveryAddress,
		isPending,
		isSuccess
	} = usePostDeliveryAddress({
		options: {
			onSuccess() {
				queryClient.invalidateQueries({ queryKey: ['getDeliveryAddresses'] })
				closeModal()
			}
		}
	})
	const form = useForm<TypeCreateDeliveryAddressSchema>({
		mode: 'onChange',
		resolver: zodResolver(deliveryAddressSchema),
		defaultValues: {
			city: '',
			street: '',
			house: '',
			flat: ''
		}
	})

	const onSubmit = (data: TypeCreateDeliveryAddressSchema) => {
		createDeliveryAddress({
			params: {
				city: data.city,
				street: data.street,
				house: data.house,
				flat: data.flat
			}
		})
	}

	return { form, onSubmit, isPending, isSuccess, isShowMap, setIsShowMap }
}
