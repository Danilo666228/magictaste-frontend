'use client'

import { Clock, Gift, ShoppingBag, Truck } from 'lucide-react'
import { useFormatter } from 'next-intl'

import { Card, CardContent, CardFooter, CardHeader, CardTitle, Container, Separator, Typography } from '@/components/ui/common'

import { useOrderStore } from '@/store/useOrderStore'

import { useProfile } from '@/shared/utils/contexts'

import { OrderItem } from './OrderItem'

export function OrderList() {
	const { items, deliveryType, total, discount, deliveryPrice } = useOrderStore()
	const formatted = useFormatter()
	const { profile } = useProfile()
	const bonusPercentage = profile?.accountLoyalty.loyaltyLevel.bonusPercentage ?? 0

	const finalTotal = total + deliveryPrice

	const deliveryTimeMessage = deliveryType === 'COURIER' ? 'Примерное время доставки: 60-90 минут' : 'Готовность заказа: через 30 минут'

	return (
		<Card className='relative overflow-hidden rounded-2xl border-0 bg-background/80 shadow-xl backdrop-blur-sm'>
			<CardHeader className='border-b border-border/50 pb-6'>
				<CardTitle className='flex items-center gap-3 text-xl font-bold'>
					<div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10'>
						<ShoppingBag className='h-5 w-5 text-primary' />
					</div>
					<span className='bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>Ваш заказ</span>
				</CardTitle>
			</CardHeader>

			<CardContent className='space-y-6 py-6'>
				<div className='flex items-center gap-3 rounded-xl bg-primary/5 p-4'>
					<div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary/10'>
						<Clock className='h-4 w-4 text-primary' />
					</div>
					<div className='flex flex-col'>
						<Typography className='text-sm font-medium text-foreground'>{deliveryTimeMessage}</Typography>
						<Typography className='text-xs text-muted-foreground'>Мы уведомим вас о готовности</Typography>
					</div>
				</div>

				<div className='space-y-4'>
					<Typography className='text-sm font-medium text-muted-foreground'>Товары ({items.length})</Typography>
					<div className='max-h-[300px] space-y-4 overflow-y-auto rounded-xl bg-background/40 p-4'>
						{items.map((item, index) => (
							<div key={item.product.id}>
								<OrderItem product={item.product} quantity={item.quantity} />
								{index < items.length - 1 && <Separator className='my-4' />}
							</div>
						))}
					</div>
				</div>
			</CardContent>

			<CardFooter className='border-t border-border/50 pt-6'>
				<div className='w-full space-y-4'>
					<div className='space-y-3'>
						<Container className='flex w-full items-center justify-between py-2'>
							<Typography className='text-muted-foreground'>Товары ({items.length})</Typography>
							<Typography className='font-medium'>
								{formatted.number(
									items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
									{ style: 'currency', currency: 'RUB' }
								)}
							</Typography>
						</Container>

						<Container className='flex w-full items-center justify-between py-2'>
							<div className='flex items-center gap-2'>
								<Truck className='h-4 w-4 text-muted-foreground' />
								<Typography className='text-muted-foreground'>Доставка</Typography>
							</div>
							<Typography className='font-medium'>
								{deliveryType === 'COURIER' ? (
									bonusPercentage >= 3 ? (
										<span className='font-semibold text-green-600'>Бесплатно</span>
									) : (
										formatted.number(deliveryPrice, { style: 'currency', currency: 'RUB' })
									)
								) : (
									<span className='font-semibold text-green-600'>Бесплатно</span>
								)}
							</Typography>
						</Container>

						{bonusPercentage > 0 && (
							<div className='flex w-full items-center justify-between rounded-lg px-3 py-2'>
								<div className='flex items-center gap-2'>
									<Gift className='h-4 w-4 text-green-600' />
									<Typography className='font-medium text-green-700'>Скидка ({bonusPercentage}%)</Typography>
								</div>
								<Typography className='font-semibold text-green-700'>
									-{formatted.number(discount, { style: 'currency', currency: 'RUB' })}
								</Typography>
							</div>
						)}
					</div>

					<Separator />

					<div className='flex w-full items-center justify-between rounded-xl bg-primary/5 p-4'>
						<Typography className='text-lg font-bold text-foreground'>Итого к оплате</Typography>
						<Typography className='text-xl font-bold text-primary'>
							{formatted.number(finalTotal, { style: 'currency', currency: 'RUB' })}
						</Typography>
					</div>
				</div>
			</CardFooter>
		</Card>
	)
}
