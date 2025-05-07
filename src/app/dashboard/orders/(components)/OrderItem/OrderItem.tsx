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

import { useGetDeliveryAddressById } from '@/shared/api/hooks/delivery-address/useDeliveryAddressById'
import { useGetPaymentDetailsQuery } from '@/shared/api/hooks/order/useGetPaymentDetailsQuery'
import { Order } from '@/shared/api/types'

import { statusInfo } from './statusInfo'
import { getMediaSource } from '@/lib/utils'

interface OrderItemProps {
	order: Order
}

// const orderSteps: { status: OrderStatus; label: string; icon: React.ReactNode }[] = [
// 	{ status: 'WAITING_FOR_PAYMENT', label: 'Ожидает оплаты', icon: <Clock className='h-4 w-4' /> },
// 	{ status: 'PAYED', label: 'Оплачен', icon: <CheckCircle className='h-4 w-4' /> },
// 	{ status: 'PROCESSING', label: 'В обработке', icon: <RefreshCcw className='h-4 w-4' /> },
// 	{ status: 'READY_FOR_DELIVERY', label: 'Готов к доставке', icon: <Package className='h-4 w-4' /> },
// 	{ status: 'DELIVERING', label: 'Доставляется', icon: <Truck className='h-4 w-4' /> },
// 	{ status: 'COMPLETED', label: 'Завершен', icon: <CheckCircle className='h-4 w-4' /> }
// ]

export function OrderItem({ order }: OrderItemProps) {
	const formatter = useFormatter()
	const { data: deliveryAddress } = useGetDeliveryAddressById({ deliveryAddressId: order.deliveryAddressId })
	const { data: paymentDetails } = useGetPaymentDetailsQuery({
		config: { params: { orderId: order.id } },
		options: { enabled: order.status === 'WAITING_FOR_PAYMENT' }
	})
	const [isExpanded, setIsExpanded] = useState<boolean>(false)

	const orderDate = new Date(order.createdAt)
	const totalItems = order.items.map(item => item.quantity).reduce((a, b) => a + b, 0)
	const totalAmount = order.total
	const info = statusInfo[order.status]
	console.log(deliveryAddress?.data.street)

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
							<Typography>{formatter.dateTime(orderDate, { day: 'numeric', month: 'long', year: 'numeric' })}</Typography>
						</div>

						<div className='ml-auto flex flex-col gap-4 sm:flex-row sm:gap-8'>
							<div className='flex flex-col items-start sm:items-center'>
								<Typography className='text-sm text-muted-foreground'>Товары</Typography>
								<Typography className='font-medium'>{totalItems} шт.</Typography>
							</div>
							<div className='flex flex-col items-start sm:items-center'>
								<Typography className='text-sm text-muted-foreground'>Сумма</Typography>
								<Typography className='font-medium'>{formatter.number(totalAmount)} ₽</Typography>
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
							<Typography className='text-lg'>
								Адрес доставки:
								{order.deliveryAddress?.street
									? ` ${order.deliveryAddress.street ?? 'Неизвестно'}, дом ${order.deliveryAddress?.flat ?? 'Неизвестно'}`
									: ` ${deliveryAddress?.data.street ?? 'Неизвестно'}, дом ${deliveryAddress?.data?.flat ?? 'Неизвестно'}`}
							</Typography>
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
