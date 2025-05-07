import { useCallback, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

import {
	Container,
	FormBlock,
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

import { useProfile } from '@/hooks/useProfile'

import { TypeCheckoutSchema } from '@/schemas/checkout/checkout'

import { useOrderStore } from '@/store/useOrderStore'

import { DeliveryType } from '@/shared/api/types/payment'

import { useCheckoutForm } from '../../(hooks)/useCheckoutForm'

import { ManualAddressFields } from './ManualAddressFields'
import { SelectAddressField } from './SelectAddressField'
import { cn } from '@/lib/utils'

interface DeliveryFieldProps {
	form: UseFormReturn<TypeCheckoutSchema>
}

export function DeliveryField({ form }: DeliveryFieldProps) {
	const { profile } = useProfile()
	const checkoutForm = useCheckoutForm()
	const { setDeliveryPrice, setDeliveryType } = useOrderStore()
	const bonusPecrentage = profile?.data.accountLoyalty.loyaltyLevel.bonusPercentage ?? 0
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
		<FormBlock title='Способ доставки'>
			<Container className='flex flex-col gap-5'>
				<FormField
					control={form.control}
					name='deliveryType'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel>Выберите способ доставки</FormLabel>
							<FormControl>
								<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='flex flex-col gap-3'>
									<div className='flex items-center space-x-2 rounded-md border p-4'>
										<RadioGroupItem value='COURIER' id='COURIER' onClick={() => handleClickDeliveryType('COURIER')} />
										<label htmlFor='COURIER' className='flex-1 cursor-pointer'>
											<div className='font-medium'>Курьером</div>
											<div className='text-sm text-gray-500'>Доставка в течение 60-90 минут</div>
										</label>
										<Typography className={cn('font-medium', isDeliveryFree && 'line-through')}>300 ₽</Typography>
									</div>
									<div className='flex items-center space-x-2 rounded-md border p-4'>
										<RadioGroupItem value='PICKUP' id='PICKUP' onClick={() => handleClickDeliveryType('PICKUP')} />
										<label htmlFor='PICKUP' className='flex-1 cursor-pointer'>
											<div className='font-medium'>Самовывоз</div>
											<div className='text-sm text-gray-500'>Готовность через 30 минут</div>
										</label>
										<div className='font-medium'>Бесплатно</div>
									</div>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{isCourier && (
					<div className='flex flex-col gap-3'>
						<div className='flex flex-col gap-3'>
							<div className='flex items-center gap-3'>
								<Label htmlFor='deliveryAddress'>Выбрать свой адрес</Label>
								<Switch id='deliveryAddress' checked={isDeliveryAddress} onCheckedChange={handleChangeDeliveryAddress} />
							</div>
							{isDeliveryAddress && <SelectAddressField form={form} />}
						</div>
						{!isDeliveryAddress && <ManualAddressFields form={form} />}

						<FormField
							control={form.control}
							name='comment'
							render={({ field }) => (
								<FormItem className='w-full'>
									<Container className='flex justify-between'>
										<FormLabel>Комментарий</FormLabel>
										<FormMessage />
									</Container>
									<FormControl>
										<Textarea className='w-full' placeholder='Комментарий к заказу' {...field} />
									</FormControl>
									<FormDescription>Оставьте комментарий для курьера</FormDescription>
								</FormItem>
							)}
						/>
					</div>
				)}
			</Container>
		</FormBlock>
	)
}
