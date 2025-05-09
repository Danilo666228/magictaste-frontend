'use client'

import { Calendar, Loader2, Search, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

import {
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	Typography
} from '@/components/ui/common'

import { useGetOrdersQuery } from '@/shared/api/hooks/order/useGetOrdersQuery'
import { Order, OrderStatus } from '@/shared/api/types'

import { OrderItem } from './OrderItem/OrderItem'

type FilterStatus = 'ALL' | OrderStatus

export function OrderList() {
	const { data: orders, isLoading } = useGetOrdersQuery()
	const [activeTab, setActiveTab] = useState<FilterStatus>('ALL')
	const [searchQuery, setSearchQuery] = useState('')
	const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'price-desc' | 'price-asc'>('date-desc')

	if (isLoading) {
		return (
			<div className='flex justify-center py-10'>
				<Loader2 size={48} className='animate-spin text-primary' />
			</div>
		)
	}

	if (!orders?.data.length) {
		return (
			<div className='flex flex-col items-center justify-center py-16 text-center'>
				<div className='mb-4 rounded-full bg-muted p-6'>
					<Calendar className='h-10 w-10 text-muted-foreground' />
				</div>
				<Typography tag='h2' className='mb-2'>
					У вас пока нет заказов
				</Typography>
				<Typography className='text-muted-foreground'>Ваши заказы будут отображаться здесь после оформления</Typography>
			</div>
		)
	}

	const filteredOrders = orders.data
		.filter(order => {
			if (activeTab === 'ALL') return true
			return order.status === OrderStatus[activeTab as keyof typeof OrderStatus]
		})
		.filter(order => {
			if (!searchQuery) return true
			return (
				order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
				order.items.some(item => item.productTitle.toLowerCase().includes(searchQuery.toLowerCase()))
			)
		})

	const sortedOrders = [...filteredOrders].sort((a, b) => {
		switch (sortBy) {
			case 'date-desc':
				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			case 'date-asc':
				return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
			case 'price-desc':
				return b.total - a.total
			case 'price-asc':
				return a.total - b.total
			default:
				return 0
		}
	})

	const getOrdersByStatus = (status: FilterStatus): Order[] => {
		if (status === 'ALL') return sortedOrders
		return sortedOrders.filter(order => order.status === OrderStatus[status as keyof typeof OrderStatus])
	}

	const statusCounts = {
		ALL: orders.data.length,
		WAITING_FOR_PAYMENT: orders.data.filter(order => order.status === 'WAITING_FOR_PAYMENT').length,
		PAYED: orders.data.filter(order => order.status === 'PAYED').length,
		PROCESSING: orders.data.filter(order => order.status === 'PROCESSING').length,
		DELIVERING: orders.data.filter(order => order.status === 'DELIVERING').length,
		COMPLETED: orders.data.filter(order => order.status === 'COMPLETED').length,
		CANCELED: orders.data.filter(order => order.status === 'CANCELED').length
	}

	return (
		<div className='space-y-6'>
			<div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
				<div className='relative w-full sm:w-72'>
					<Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
					<Input
						placeholder='Поиск заказов...'
						className='pl-10'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
					/>
				</div>

				<div className='flex w-full items-center gap-2 sm:w-auto'>
					<SlidersHorizontal className='h-4 w-4 text-muted-foreground' />
					<Select value={sortBy} onValueChange={value => setSortBy(value as any)}>
						<SelectTrigger className='w-full sm:w-[180px]'>
							<SelectValue placeholder='Сортировка' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='date-desc'>Сначала новые</SelectItem>
							<SelectItem value='date-asc'>Сначала старые</SelectItem>
							<SelectItem value='price-desc'>По убыванию цены</SelectItem>
							<SelectItem value='price-asc'>По возрастанию цены</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<Tabs defaultValue='ALL' value={activeTab} onValueChange={value => setActiveTab(value as FilterStatus)}>
				<TabsList className='mb-6 grid grid-cols-4'>
					<TabsTrigger value='ALL'>
						Все
						<span className='ml-2 rounded-full bg-muted px-2 py-0.5 text-xs'>{statusCounts.ALL}</span>
					</TabsTrigger>
					<TabsTrigger value='WAITING_FOR_PAYMENT'>
						Ожидают оплаты
						{statusCounts.WAITING_FOR_PAYMENT > 0 && (
							<span className='ml-2 rounded-full bg-destructive px-2 py-0.5 text-xs text-destructive-foreground'>
								{statusCounts.WAITING_FOR_PAYMENT}
							</span>
						)}
					</TabsTrigger>
					<TabsTrigger value='PROCESSING'>
						В обработке
						{statusCounts.PROCESSING > 0 && (
							<span className='ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800'>
								{statusCounts.PROCESSING}
							</span>
						)}
					</TabsTrigger>
					<TabsTrigger value='COMPLETED'>
						Завершенные
						{statusCounts.COMPLETED > 0 && (
							<span className='ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800'>
								{statusCounts.COMPLETED}
							</span>
						)}
					</TabsTrigger>
				</TabsList>

				<TabsContent value='ALL' className='space-y-4'>
					{sortedOrders.length === 0 ? (
						<div className='py-10 text-center text-muted-foreground'>Заказы не найдены</div>
					) : (
						sortedOrders.map(order => <OrderItem key={order.id} order={order} />)
					)}
				</TabsContent>

				{(['WAITING_FOR_PAYMENT', 'PAYED', 'PROCESSING', 'DELIVERING', 'COMPLETED', 'CANCELED'] as const).map(status => (
					<TabsContent key={status} value={status} className='space-y-4'>
						{getOrdersByStatus(status).length === 0 ? (
							<div className='py-10 text-center text-muted-foreground'>
								{status === 'WAITING_FOR_PAYMENT' && 'У вас нет заказов, ожидающих оплаты'}
								{status === 'PAYED' && 'У вас нет оплаченных заказов'}
								{status === 'PROCESSING' && 'У вас нет заказов в обработке'}
								{status === 'DELIVERING' && 'У вас нет заказов в доставке'}
								{status === 'COMPLETED' && 'У вас нет завершенных заказов'}
								{status === 'CANCELED' && 'У вас нет отмененных заказов'}
							</div>
						) : (
							getOrdersByStatus(status).map(order => <OrderItem key={order.id} order={order} />)
						)}
					</TabsContent>
				))}
			</Tabs>
		</div>
	)
}
