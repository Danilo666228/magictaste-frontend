import { Building, Home, Loader2, MapPin, Navigation } from 'lucide-react'
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
	Switch,
	Typography
} from '@/components/ui/common'
import { YandexMap } from '@/components/ui/elements/yandex-map/YandexMap'

import { TypeCheckoutSchema } from '@/schemas/checkout/checkout'

interface ManualAddressFieldsProps {
	form: UseFormReturn<TypeCheckoutSchema>
}

const fields = [
	{
		name: 'city',
		label: 'Город',
		description: 'Введите ваш город',
		placeholder: 'Москва',
		icon: Building
	},
	{
		name: 'street',
		label: 'Улица',
		description: 'Введите вашу улицу',
		placeholder: 'ул. Пушкина',
		icon: Navigation
	},
	{
		name: 'house',
		label: 'Дом',
		description: 'Введите номер дома',
		placeholder: 'д. 10',
		icon: Home
	},
	{
		name: 'flat',
		label: 'Квартира',
		description: 'Введите номер квартиры',
		placeholder: 'кв. 25',
		icon: Home
	}
]

export function ManualAddressFields({ form }: ManualAddressFieldsProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [isShowMap, setIsShowMap] = useState(false)

	return (
		<div className='space-y-6'>
			{/* Address Fields */}
			<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
				{fields.map(field => {
					const IconComponent = field.icon
					return (
						<FormField
							key={field.name}
							control={form.control}
							name={`deliveryAddress.${field.name}` as any}
							render={({ field: formField }) => (
								<FormItem className='space-y-3'>
									<Container className='flex justify-between'>
										<FormLabel className='flex items-center gap-2 font-medium'>
											<IconComponent className='h-4 w-4 text-primary' />
											{field.label}
										</FormLabel>
										<FormMessage />
									</Container>
									<FormControl>
										<div className='relative'>
											<Input {...formField} onChange={formField.onChange} placeholder={field.placeholder} className='' />
										</div>
									</FormControl>
									<FormDescription className='flex items-center gap-2 text-xs'>
										<span className='h-1 w-1 rounded-full bg-primary'></span>
										{field.description}
									</FormDescription>
								</FormItem>
							)}
						/>
					)
				})}
			</div>

			<div className='rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 p-6'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-4'>
						<div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10'>
							<MapPin className='h-6 w-6 text-primary' />
						</div>
						<div className='flex flex-col gap-2'>
							<Label htmlFor='address' className='cursor-pointer text-lg font-semibold'>
								Выбрать на карте
							</Label>
							<Typography className='text-sm text-muted-foreground'>Точный адрес одним кликом</Typography>
						</div>
					</div>
					<Switch id='address' checked={isShowMap} onCheckedChange={() => setIsShowMap(!isShowMap)} className='scale-110' />
				</div>
			</div>

			{isShowMap && (
				<div className='space-y-4'>
					<div className='flex items-center justify-between gap-3'>
						<div className='flex items-center gap-2'>
							<MapPin className='h-5 w-5 text-primary' />
							<Typography className='font-semibold'>Интерактивная карта</Typography>
						</div>
						<Typography className='text-primaru rounded-full bg-primary/50 px-2 py-1 text-xs font-medium'>
							Кликните по нужному месту
						</Typography>
					</div>

					<div className='relative overflow-hidden rounded-2xl border-2 border-primary/20 shadow-lg'>
						{isLoading && (
							<div className='absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm'>
								<div className='flex items-center gap-3 rounded-xl bg-background p-4 shadow-lg'>
									<Loader2 className='h-6 w-6 animate-spin text-primary' />
									<Typography className='font-medium'>Загрузка карты...</Typography>
								</div>
							</div>
						)}
						<YandexMap
							onLoad={() => setIsLoading(false)}
							showGeolocationControl
							initialCoordinates={{ latitude: 59.9386, longitude: 30.3141 }}
							onLocationSelect={data => {
								form.setValue('deliveryAddress.city', data.address?.city || '')
								form.setValue('deliveryAddress.street', data.address?.street || '')
								form.setValue('deliveryAddress.house', data.address?.house || '')
							}}
							width='100%'
							height='400px'
						/>
					</div>
				</div>
			)}
		</div>
	)
}
