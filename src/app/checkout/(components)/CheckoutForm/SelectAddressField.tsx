import { UseFormReturn } from 'react-hook-form'

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/common'

import { TypeCheckoutSchema } from '@/schemas/checkout/checkout'
import { useGetDeliveryAddress } from '@/shared/api/hooks/delivery-address/useGetDeliveryAddress'

interface SelectAddressFieldProps {
	form: UseFormReturn<TypeCheckoutSchema>
	
}

export function SelectAddressField({ form }: SelectAddressFieldProps) {
	const { data: deliveryAddresses } = useGetDeliveryAddress()
	return (
		<FormField
			control={form.control}
			name='deliveryAddressId'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Выберите адрес</FormLabel>
					<FormControl>
						<Select value={field.value} onValueChange={field.onChange}>
							<SelectTrigger>
								<SelectValue placeholder='Выберите адрес' />
							</SelectTrigger>
							<SelectContent>
								{deliveryAddresses?.data?.map(address => (
									<SelectItem key={address.id} value={address.id}>
										{`${address.city}, ${address.street}, ${address.house}, ${address.flat}`}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormControl>
				</FormItem>
			)}
		/>
	)
}
