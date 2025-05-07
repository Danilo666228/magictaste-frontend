'use client'

import { Clock, ShoppingBag } from 'lucide-react'
import { useFormatter } from 'next-intl'

import { Card, CardContent, CardFooter, CardHeader, CardTitle, Container, Separator, Typography } from '@/components/ui/common'

import { useProfile } from '@/hooks/useProfile'

import { useOrderStore } from '@/store/useOrderStore'

import { OrderItem } from './OrderItem'

export function OrderList() {
	const { items, deliveryType, total, discount,deliveryPrice } = useOrderStore()
	const formatted = useFormatter()
	const { profile } = useProfile()
	const bonusPercentage = profile?.data.accountLoyalty.loyaltyLevel.bonusPercentage ?? 0
	
	const finalTotal = total + deliveryPrice

	const deliveryTimeMessage = deliveryType === 'COURIER' ? 'Примерное время доставки: 60-90 минут' : 'Готовность заказа: через 30 минут'

	return (
		<Card className='sticky top-10 rounded-lg border shadow-sm'>
			<CardHeader className='border-b pb-4'>
				<CardTitle className='flex items-center gap-2 text-xl font-bold'>
					<ShoppingBag className='h-5 w-5' />
					Ваш заказ
				</CardTitle>
			</CardHeader>
			<CardContent className='py-4'>
				<div className='mb-4 flex items-center gap-2 rounded-md p-3 text-sm text-gray-600'>
					<Clock className='h-4 w-4' />
					<span>{deliveryTimeMessage}</span>
				</div>

				<ul className='flex max-h-[300px] flex-col gap-3 overflow-y-auto'>
					{items.map(item => (
						<li key={item.product.id}>
							<OrderItem product={item.product} quantity={item.quantity} />
							{items.indexOf(item) < items.length - 1 && <Separator className='my-3' />}
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter className='flex flex-col border-t pt-4'>
				<Container className='flex w-full items-center justify-between py-1'>
					<Typography className='text-gray-600'>Товары ({items.length})</Typography>
					<Typography>
						{formatted.number(
							items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
							{ style: 'currency', currency: 'RUB' }
						)}
					</Typography>
				</Container>
				<Container className='flex w-full items-center justify-between py-1'>
					<Typography className='text-gray-600'>Доставка</Typography>
					<Typography>
						{deliveryType === 'COURIER'
							? bonusPercentage >= 3
								? 'Бесплатно'
								: formatted.number(deliveryPrice, { style: 'currency', currency: 'RUB' })
							: 'Бесплатно'}
					</Typography>
				</Container>
				{bonusPercentage > 0 && (
					<Container className='flex w-full items-center justify-between py-1 text-green-600'>
						<Typography>Скидка ({bonusPercentage}%)</Typography>
						<Typography>-{formatted.number(discount, { style: 'currency', currency: 'RUB' })}</Typography>
					</Container>
				)}
				<Separator className='my-3' />
				<Container className='flex w-full items-center justify-between'>
					<Typography className='text-lg font-bold'>Итого</Typography>
					<Typography className='text-lg font-bold'>{formatted.number(finalTotal, { style: 'currency', currency: 'RUB' })}</Typography>
				</Container>
			</CardFooter>
		</Card>
	)
}
