import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'



import { useProfile } from '@/hooks/useProfile'

import { TypeCreateDeliveryAddressSchema, deliveryAddressSchema } from '@/schemas/delivery-address/delivery-address'

import { useGetDeliveryAddress } from '@/shared/api/hooks/delivery-address/useGetDeliveryAddress'
import { usePostDeliveryAddress } from '@/shared/api/hooks/delivery-address/usePostDeliveryAddress'
import { useModal } from '@/components/ui/elements/modal/FormModal/FormModalContext'

export const useDeliveryAddressForm = () => {
	const { closeModal } = useModal()
	const { refetch } = useGetDeliveryAddress()
	const { refetch: refetchProfile } = useProfile()
	const {
		mutate: createDeliveryAddress,
		isPending,
		isSuccess
	} = usePostDeliveryAddress({
		options: {
			onSuccess() {
				refetch()
				refetchProfile()
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

	return { form, onSubmit, isPending, isSuccess, reset: form.reset }
}
