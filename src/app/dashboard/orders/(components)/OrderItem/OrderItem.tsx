import { useFormatter } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Badge,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Typography
} from '@/components/ui/common'

import { useGetPaymentDetailsQuery } from '@/shared/api/hooks/order/useGetPaymentDetailsQuery'
import { Order } from '@/shared/api/types'

import { statusInfo } from './statusInfo'
import { getMediaSource } from '@/lib/utils'

interface OrderItemProps {
	order: Order
}

export function OrderItem({ order }: OrderItemProps) {
	const formatter = useFormatter()

	const { data: paymentDetails } = useGetPaymentDetailsQuery({
		config: { params: { orderId: order.id } },
		options: { enabled: order.status === 'WAITING_FOR_PAYMENT' }
	})
	const [isExpanded, setIsExpanded] = useState<boolean>(false)

	const info = statusInfo[order.status]

	return (
		<Accordion type='multiple' className='my-6'>
			<AccordionItem value={order.id} className='border bg-white'>
				<AccordionTrigger>
					<div className='flex w-full flex-col items-start gap-4 p-2 sm:flex-row sm:items-center'>
						<Badge variant='outline' className={`flex items-center gap-2 rounded ${info.bgColor} ${info.textColor}`}>
							<info.icon size={16} />
							<Typography className='text-sm font-medium'>{info.label}</Typography>
						</Badge>
						<div className='flex flex-col'>
							<Typography className='text-muted-foreground'>Заказ #{order.id.substring(0, 8)}</Typography>
							<Typography>
								{formatter.dateTime(new Date(order.createdAt), {
									day: 'numeric',
									month: 'long',
									year: 'numeric',
									hour: 'numeric',
									minute: 'numeric'
								})}
							</Typography>
						</div>

						<div className='ml-auto flex flex-col gap-4 sm:flex-row sm:gap-8'>
							<div className='flex flex-col items-start sm:items-center'>
								<Typography className='text-sm text-muted-foreground'>Товары</Typography>
								<Typography className='font-medium'>
									{order.items.map(item => item.quantity).reduce((acc, item) => acc + item, 0)} шт.
								</Typography>
							</div>
							<div className='flex flex-col items-start sm:items-center'>
								<Typography className='text-sm text-muted-foreground'>Сумма</Typography>
								<Typography className='font-medium'>{formatter.number(order.total)} ₽</Typography>
							</div>
						</div>
					</div>
				</AccordionTrigger>

				<AccordionContent className='flex flex-col gap-3 bg-white'>
					{order.items.slice(0, isExpanded ? order.items.length : 3).map(item => (
						<div key={item.id} className='flex flex-col items-start gap-4 rounded-lg bg-white p-4 sm:flex-row sm:items-center'>
							<div className='relative h-20 w-20 overflow-hidden rounded-md bg-muted'>
								<Image
									src={getMediaSource(item.productImageUrl)}
									alt={item.productTitle || 'Товар'}
									fill
									className='object-contain'
								/>
							</div>

							<div className='mr-auto'>
								<h3 className='text-lg font-medium'>{item.productTitle || 'Товар'}</h3>
								<p className='line-clamp-1 text-sm text-muted-foreground'>{item.productDescription || ''}</p>
							</div>

							<div className='mt-2 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:gap-8'>
								<div className='flex flex-col items-start sm:items-center'>
									<span className='text-sm text-muted-foreground'>Цена</span>
									<span>{formatter.number(item.price || 0)} ₽</span>
								</div>
								<div className='flex flex-col items-start sm:items-center'>
									<span className='text-sm text-muted-foreground'>Кол-во</span>
									<span>{item.quantity} шт.</span>
								</div>
								<div className='flex flex-col items-start sm:items-center'>
									<span className='text-sm text-muted-foreground'>Итого</span>
									<span className='font-medium'>{formatter.number((item.price || 0) * item.quantity)} ₽</span>
								</div>
							</div>
						</div>
					))}

					{order.items.length > 3 && (
						<div className='flex justify-center'>
							<Button variant='outline' onClick={() => setIsExpanded(!isExpanded)}>
								{isExpanded ? 'Скрыть' : 'Показать все позиции'}
							</Button>
						</div>
					)}

					<Card className='mx-4'>
						<CardHeader>
							<CardTitle className='text-xl'>Информация о доставке</CardTitle>
						</CardHeader>
						<CardContent className='flex flex-col gap-3'>
							<Typography className='text-lg text-muted-foreground'>
								Способ доставки: {order.deliveryType === 'COURIER' ? 'Курьер' : 'Самовывоз'}
							</Typography>
							<Typography className='text-lg'>
								Способ оплаты: {order.paymentMethod === 'CARD' ? 'Банковская карта' : 'Наличные'}
							</Typography>

							{order.status === 'WAITING_FOR_PAYMENT' && paymentDetails?.data.confirmation?.confirmation_url && (
								<div className='mt-4 flex justify-end'>
									<Button
										onClick={() => window.open(paymentDetails?.data.confirmation?.confirmation_url, '_blank')}
										className='px-6'>
										Оплатить заказ
									</Button>
								</div>
							)}
							<div></div>
						</CardContent>
					</Card>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
