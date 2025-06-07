import { MapPin } from 'lucide-react'
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
	SelectValue,
	Typography
} from '@/components/ui/common'

import { TypeCheckoutSchema } from '@/schemas/checkout/checkout'

import { useGetDeliveryAddress } from '@/shared/api/hooks/delivery-address/useGetDeliveryAddress'

interface SelectAddressFieldProps {
	form: UseFormReturn<TypeCheckoutSchema>
}

export function SelectAddressField({ form }: SelectAddressFieldProps) {
	const { data: deliveryAddresses } = useGetDeliveryAddress()

	return (
		<div className='space-y-4'>
			<FormField
				control={form.control}
				name='deliveryAddressId'
				render={({ field }) => (
					<FormItem className='space-y-3'>
						<FormLabel className='flex items-center gap-2 text-lg font-medium'>
							<MapPin className='h-5 w-5 text-primary' />
							Выберите сохраненный адрес
						</FormLabel>
						<FormControl>
							<Select value={field.value} onValueChange={field.onChange}>
								<SelectTrigger>
									<SelectValue placeholder='Выберите адрес из списка' />
								</SelectTrigger>
								<SelectContent className=''>
									{deliveryAddresses?.data?.length ? (
										deliveryAddresses.data.map(address => (
											<SelectItem key={address.id} value={address.id} className=''>
												{`${address.city}, ${address.street}, ${address.house}`}
												{address.flat && `, кв. ${address.flat}`}
											</SelectItem>
										))
									) : (
										<div className='p-4 text-center'>
											<div className='flex flex-col items-center gap-2'>
												<MapPin className='h-8 w-8 text-muted-foreground/50' />
												<Typography className='text-sm text-muted-foreground'>У вас пока нет сохраненных адресов</Typography>
												<Typography className='text-xs text-muted-foreground'>Используйте ручной ввод адреса</Typography>
											</div>
										</div>
									)}
								</SelectContent>
							</Select>
						</FormControl>

						{deliveryAddresses?.data?.length && (
							<div className='flex items-center gap-2 text-xs text-muted-foreground'>
								<span className='h-1 w-1 rounded-full bg-primary'></span>
								<span>
									Найдено {deliveryAddresses.data.length} {deliveryAddresses.data.length === 1 ? 'адрес' : 'адресов'}
								</span>
							</div>
						)}
					</FormItem>
				)}
			/>
		</div>
	)
}
