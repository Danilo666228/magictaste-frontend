'use client'

import { DollarSign, ShoppingCart, Star, UserRound } from 'lucide-react'
import { useFormatter } from 'next-intl'
import { useState } from 'react'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	ScrollArea,
	Tabs,
	TabsList,
	TabsTrigger
} from '@/components/ui/common'

import { useGetDashboardStatistics } from '@/shared/api/hooks/statisctics/useGetDashboardStatisctics'

import { CardStatistic } from './CardStatistic'
import { ChartDinamycSales } from './ChartDynamicSales/ChartDinamycSales'
import { getMediaSource } from '@/lib/utils'
import { cn } from '@/lib/utils/twMerge'

export function Statisctics() {
	const [period, setPeriod] = useState<string>('week')
	const format = useFormatter()

	const { data: statistics, isLoading } = useGetDashboardStatistics({
		config: { params: { period } }
	})

	const calculatePercentageChange = (current: number, previous: number): number => {
		if (previous === 0) return current > 0 ? 100 : 0
		return Number((((current - previous) / previous) * 100).toFixed(1))
	}

	// Получение процентных изменений для каждой метрики
	const changes = {
		sales: statistics?.data.sales.comparison
			? calculatePercentageChange(statistics.data.sales.totalSales, statistics.data.sales.comparison.previousSales)
			: 0,
		revenue: statistics?.data.sales.comparison
			? calculatePercentageChange(statistics.data.sales.salesAmount, statistics.data.sales.comparison.previousAmount)
			: 0
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<h2 className='text-3xl font-bold tracking-tight'>Статистика магазина</h2>
				<div className='flex items-center gap-2'>
					<Tabs defaultValue={period} className='w-full' onValueChange={value => setPeriod(value)}>
						<TabsList className='grid w-full max-w-[400px] grid-cols-4'>
							<TabsTrigger value='day'>День</TabsTrigger>
							<TabsTrigger value='week'>Неделя</TabsTrigger>
							<TabsTrigger value='month'>Месяц</TabsTrigger>
							<TabsTrigger value='year'>Год</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
			</div>

			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
				<CardStatistic title='Доход' Icon={DollarSign} value={statistics?.data.sales.salesAmount || 0} percentage={changes.revenue} />
				<CardStatistic title='Продажи' Icon={ShoppingCart} value={statistics?.data.sales.totalSales || 0} percentage={changes.sales} />
				<CardStatistic
					title='Клиенты'
					Icon={UserRound}
					value={statistics?.data.customers.totalCustomers || 0}
					percentage={statistics?.data.customers.comparison.previousNewCustomers || 0}
				/>
			</div>

			<div className='grid gap-4 md:grid-cols-2'>
				<div className='h-[600px]'>
					<ChartDinamycSales
						period={period as 'day' | 'week' | 'month' | 'year'}
						isLoading={isLoading}
						sales={statistics?.data.sales}
						customers={statistics?.data.customers}
					/>
				</div>
				<Card className='h-[600px]'>
					<CardHeader>
						<CardTitle>Лента активности</CardTitle>
						<CardDescription>Последние действия в магазине</CardDescription>
					</CardHeader>
					<ScrollArea className='h-[calc(100%-110px)]'>
						<CardContent className='p-0'>
							<ul className='space-y-6 p-4'>
								{statistics?.data.activityFeed.map((activity, index) => (
									<li key={index} className='flex gap-4'>
										<Avatar>
											<AvatarImage src={getMediaSource(activity.user.picture)} />
											<AvatarFallback>{activity.user.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
										</Avatar>
										<div>
											<p className='text-sm'>
												<span className='font-medium'>{activity.user.userName}</span>{' '}
												{activity.type === 'PURCHASE' && (
													<>
														совершил покупку на сумму{' '}
														<span className='font-medium'>{format.number(activity.orderTotal || 0)}</span>
													</>
												)}
												{activity.type === 'NEW_USER' && 'зарегистрировался в магазине'}
												{activity.type === 'REVIEW' && (
													<>
														оставил отзыв на товар <span className='font-medium'>{activity.product?.title}</span>
													</>
												)}
											</p>
											<p className='text-xs text-muted-foreground'>{format.dateTime(new Date(activity.date))}</p>
											{activity.type === 'REVIEW' && activity.rating && (
												<div className='mt-1 flex items-center'>
													{Array.from({ length: 5 }).map((_, i) => (
														<Star
															key={i}
															className={cn(
																'h-4 w-4',
																i < activity.rating! ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground'
															)}
														/>
													))}
													{activity.comment && <p className='ml-2 text-xs italic'>"{activity.comment.substring(0, 50)}..."</p>}
												</div>
											)}
										</div>
									</li>
								))}
							</ul>
						</CardContent>
					</ScrollArea>
				</Card>
				{/* <ChartPaymentMethod isLoading={isLoading} paymentMethods={statistics?.data.paymentMethods ?? []} /> */}
				{/* <ChartLastOrders isLoading={isLoading} recentPurchases={statistics?.data.recentPurchases ?? []} /> */}
			</div>
			{/* <Card className=''>
				<CardHeader>
					<CardTitle>Топ продаваемых товаров</CardTitle>
					<CardDescription>Самые популярные товары за выбранный период</CardDescription>
				</CardHeader>
				<CardContent className=''>
					{isLoading ? (
						<div className='space-y-4'>
							{[1, 2, 3, 4, 5].map(i => (
								<div key={i} className='flex items-center gap-4'>
									<Skeleton className='h-12 w-12 rounded' />
									<div className='flex-1 space-y-2'>
										<Skeleton className='h-4 w-full' />
										<Skeleton className='h-4 w-3/4' />
									</div>
									<Skeleton className='h-8 w-8 rounded-full' />
								</div>
							))}
						</div>
					) : (
						<div className='space-y-4'>
							{statistics?.data.topProducts.map((product, index) => (
								<div key={product.id} className='flex items-center justify-between'>
									<div className='flex items-center gap-4'>
										<div className='h-12 w-12 overflow-hidden rounded bg-muted'>
											{product.imageUrl ? (
												<img
													src={getMediaSource(product.imageUrl)}
													alt={product.title}
													className='h-full w-full object-cover'
												/>
											) : (
												<div className='flex h-full w-full items-center justify-center'>
													<Package className='h-6 w-6 text-muted-foreground' />
												</div>
											)}
										</div>
										<div>
											<p className='text-sm font-medium'>{product.title}</p>
											<p className='text-xs text-muted-foreground'>
												{product.totalQuantity} шт. • {format.number(product.totalRevenue)}
											</p>
										</div>
									</div>
									<div className='hidden md:block'>
										<Badge variant='outline'>{`#${index + 1}`}</Badge>
									</div>
								</div>
							))}
						</div>
					)}
				</CardContent>
			</Card> */}
		</div>
	)
}
