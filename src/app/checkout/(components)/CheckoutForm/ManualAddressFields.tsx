import { Loader2, MapPin } from 'lucide-react'
import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

import {
	Container,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Label,
	Switch
} from '@/components/ui/common'
import { YandexMap } from '@/components/ui/elements/yandex-map/YandexMap'

import { TypeCheckoutSchema } from '@/schemas/checkout/checkout'

interface ManualAddressFieldsProps {
	form: UseFormReturn<TypeCheckoutSchema>
}

const fields = [
	{ name: 'city', label: 'Город', description: 'Введите ваш город' },
	{ name: 'street', label: 'Улица', description: 'Введите вашу улицу' },
	{ name: 'house', label: 'Дом', description: 'Введите ваш дом' },
	{ name: 'flat', label: 'Квартиру', description: 'Введите вашe квартиру' }
]
export function ManualAddressFields({ form }: ManualAddressFieldsProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [isShowMap, setIsShowMap] = useState(false)
	

	return (
		<div className='flex flex-col gap-3'>
			<div className='grid grid-cols-2 gap-10'>
				{fields.map(f => (
					<FormField
						key={f.name}
						control={form.control}
						name={`deliveryAddress.${f.name}` as any}
						render={({ field }) => (
							<FormItem>
								<Container className='flex justify-between'>
									<FormLabel>{f.label}</FormLabel>
									<FormMessage />
								</Container>
								<FormControl>
									<Input {...field} onChange={field.onChange} />
								</FormControl>
								<FormDescription>{f.description}</FormDescription>
							</FormItem>
						)}
					/>
				))}
			</div>

			<div className='flex items-center justify-center gap-5 rounded-lg bg-muted/30 p-3'>
				<MapPin size={26} className='text-primary' />
				<Label htmlFor='address'>Выбрать на карте</Label>
				<Switch id='address' checked={isShowMap} onCheckedChange={() => setIsShowMap(!isShowMap)} />
			</div>

			{isShowMap &&
				(isLoading ? (
					<Loader2 size={26} className='animate-spin' />
				) : (
					<div className='overflow-hidden rounded-lg border'>
						<YandexMap
							onLoad={() => setIsLoading(false)}
							onLocationSelect={data => {
								form.setValue('deliveryAddress.city', data.address?.city || '')
								form.setValue('deliveryAddress.street', data.address?.street || '')
								form.setValue('deliveryAddress.house', data.address?.house || '')
							}}
							width='100%'
						/>
					</div>
				))}
		</div>
	)
}
