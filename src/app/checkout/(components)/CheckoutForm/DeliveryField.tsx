import { Clock, MapPin, MessageSquare, Store, Truck } from 'lucide-react'
import { useCallback, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

import {
	Container,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Label,
	RadioGroup,
	RadioGroupItem,
	Switch,
	Textarea,
	Typography
} from '@/components/ui/common'

import { TypeCheckoutSchema } from '@/schemas/checkout/checkout'

import { useOrderStore } from '@/store/useOrderStore'

import { DeliveryType } from '@/shared/api/types/payment'
import { cn } from '@/shared/hooks/helpers'
import { useProfile } from '@/shared/utils/contexts'

import { useCheckoutForm } from '../../(hooks)/useCheckoutForm'

import { ManualAddressFields } from './ManualAddressFields'
import { SelectAddressField } from './SelectAddressField'

interface DeliveryFieldProps {
	form: UseFormReturn<TypeCheckoutSchema>
}

export function DeliveryField({ form }: DeliveryFieldProps) {
	const { profile } = useProfile()
	const checkoutForm = useCheckoutForm()
	const { setDeliveryPrice, setDeliveryType } = useOrderStore()
	const bonusPecrentage = profile?.accountLoyalty.loyaltyLevel.bonusPercentage ?? 0
	const isDeliveryFree = bonusPecrentage >= 3

	const [isDeliveryAddress, setIsDeliveryAddress] = useState(true)

	const handleChangeDeliveryAddress = () => {
		setIsDeliveryAddress(!isDeliveryAddress)
		checkoutForm.form.reset({
			deliveryAddressId: '',
			deliveryAddress: {
				city: '',
				flat: '',
				house: '',
				street: ''
			}
		})
	}

	const handleClickDeliveryType = useCallback(
		(type: DeliveryType) => {
			if (type === 'PICKUP') {
				setDeliveryType('PICKUP')
				setDeliveryPrice(0)
			} else {
				setDeliveryPrice(300)
				setDeliveryType('COURIER')
			}
		},
		[setDeliveryPrice, setDeliveryType]
	)

	const isCourier = form.watch('deliveryType') === 'COURIER'

	return (
		<div className='space-y-8'>
			<div className='flex items-center gap-4 rounded-2xl bg-primary/5 p-6'>
				<div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10'>
					<Truck className='h-6 w-6 text-primary' />
				</div>
				<div>
					<Typography tag='h3' className='text-xl font-bold text-foreground'>
						Способ доставки
					</Typography>
					<Typography className='text-sm text-muted-foreground'>Выберите удобный для вас способ получения заказа</Typography>
				</div>
			</div>

			<div className='space-y-6'>
				<FormField
					control={form.control}
					name='deliveryType'
					render={({ field }) => (
						<FormItem className='space-y-4'>
							<FormLabel className='text-lg font-semibold'>Как вы хотите получить заказ?</FormLabel>
							<FormControl>
								<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='grid gap-4 md:grid-cols-2'>
									<div
										className={cn(
											'group relative cursor-pointer overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300',
											field.value === 'COURIER'
												? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
												: 'border-border bg-background/80 hover:border-primary/50 hover:bg-primary/5'
										)}>
										<RadioGroupItem
											value='COURIER'
											id='COURIER'
											onClick={() => handleClickDeliveryType('COURIER')}
											className='absolute right-4 top-4'
										/>
										<label htmlFor='COURIER' className='flex cursor-pointer flex-col space-y-4'>
											<div className='flex items-center gap-4'>
												<div
													className={cn(
														'flex h-12 w-12 items-center justify-center rounded-xl transition-colors',
														field.value === 'COURIER' ? 'bg-primary/10' : 'bg-muted/50'
													)}>
													<Truck
														className={cn(
															'h-6 w-6 transition-colors',
															field.value === 'COURIER' ? 'text-primary' : 'text-muted-foreground'
														)}
													/>
												</div>
												<div className='flex-1'>
													<Typography className='text-lg font-semibold'>Курьером</Typography>
													<div className='flex items-center gap-2 text-sm text-muted-foreground'>
														<Clock className='h-4 w-4' />
														<span>Доставка в течение 60-90 минут</span>
													</div>
												</div>
											</div>
											<div className='flex items-center justify-between'>
												<div className='flex items-center gap-2'>
													<span className='text-sm text-muted-foreground'>Стоимость:</span>
													{isDeliveryFree && (
														<span className='rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700'>
															Бесплатно по бонусам
														</span>
													)}
												</div>
												<Typography
													className={cn(
														'text-lg font-bold',
														isDeliveryFree ? 'text-green-600 line-through' : 'text-foreground'
													)}>
													300 ₽
												</Typography>
											</div>
										</label>
									</div>

									<div
										className={cn(
											'group relative cursor-pointer overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300',
											field.value === 'PICKUP'
												? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
												: 'border-border bg-background/80 hover:border-primary/50 hover:bg-primary/5'
										)}>
										<RadioGroupItem
											value='PICKUP'
											id='PICKUP'
											onClick={() => handleClickDeliveryType('PICKUP')}
											className='absolute right-4 top-4'
										/>
										<label htmlFor='PICKUP' className='flex cursor-pointer flex-col space-y-4'>
											<div className='flex items-center gap-4'>
												<div
													className={cn(
														'flex h-12 w-12 items-center justify-center rounded-xl transition-colors',
														field.value === 'PICKUP' ? 'bg-primary/10' : 'bg-muted/50'
													)}>
													<Store
														className={cn(
															'h-6 w-6 transition-colors',
															field.value === 'PICKUP' ? 'text-primary' : 'text-muted-foreground'
														)}
													/>
												</div>
												<div className='flex-1'>
													<Typography className='text-lg font-semibold'>Самовывоз</Typography>
													<div className='flex items-center gap-2 text-sm text-muted-foreground'>
														<Clock className='h-4 w-4' />
														<span>Готовность через 30 минут</span>
													</div>
												</div>
											</div>
											<div className='flex items-center justify-between'>
												<Typography className='text-lg font-bold text-green-600'>Бесплатно</Typography>
											</div>
										</label>
									</div>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{isCourier && (
					<div className='space-y-6 rounded-2xl bg-background/60 p-6 backdrop-blur-sm'>
						<div className='flex items-center gap-3'>
							<MapPin className='h-5 w-5 text-primary' />
							<Typography className='text-lg font-semibold'>Адрес доставки</Typography>
						</div>

						<div className='flex items-center justify-between rounded-xl bg-primary/5 p-4'>
							<div className='flex items-center gap-3'>
								<Label htmlFor='deliveryAddress' className='font-medium'>
									Использовать сохраненный адрес
								</Label>
								<span className='text-xs text-muted-foreground'>Быстрое оформление</span>
							</div>
							<Switch id='deliveryAddress' checked={isDeliveryAddress} onCheckedChange={handleChangeDeliveryAddress} />
						</div>

						<div className='space-y-4'>
							{isDeliveryAddress ? <SelectAddressField form={form} /> : <ManualAddressFields form={form} />}
						</div>

						<FormField
							control={form.control}
							name='comment'
							render={({ field }) => (
								<FormItem className='space-y-3'>
									<Container className='flex justify-between'>
										<FormLabel className='flex items-center gap-2 font-medium'>
											<MessageSquare className='h-4 w-4 text-primary' />
											Комментарий для курьера
										</FormLabel>
										<FormMessage />
									</Container>
									<FormControl>
										<Textarea
											className='resize-none'
											placeholder='Например: домофон не работает, звонить в квартиру'
											rows={3}
											{...field}
										/>
									</FormControl>
									<FormDescription className='flex items-center gap-2 text-xs'>
										<span className='h-1 w-1 rounded-full bg-primary'></span>
										Укажите особенности доставки, если есть
									</FormDescription>
								</FormItem>
							)}
						/>
					</div>
				)}
			</div>
		</div>
	)
}
