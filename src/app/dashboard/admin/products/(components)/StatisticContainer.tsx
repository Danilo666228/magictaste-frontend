'use client'

import { DollarSign, MessageSquareMore, ShoppingBasket } from 'lucide-react'
import { ComponentProps } from 'react'

import { Card, CardContent, CardHeader, CardTitle, Skeleton, Typography } from '@/components/ui/common'

import { useGetProductsStatisticsQuery } from '@/shared/api/hooks/statisctics/useGetProductsStatistics'

interface StatisticContainerProps extends ComponentProps<'section'> {}

export function StatisticContainer({ ...props }: StatisticContainerProps) {
	const { data: products, isFetching } = useGetProductsStatisticsQuery()

	if (isFetching) return <StatisticContainerSkeleton />

	return (
		<section className='my-5 grid grid-cols-3 gap-5' {...props}>
			<Card className='flex flex-row items-center gap-3'>
				<CardHeader className='flex flex-row items-center gap-3'>
					<div className='w-fit rounded-full bg-primary/20 p-2'>
						<ShoppingBasket className='text-primary' />
					</div>
					<CardTitle>Общее количество продукции</CardTitle>
				</CardHeader>
				<CardContent className='flex flex-1 items-center justify-center p-0'>
					<Typography className='text-2xl font-semibold'>{products?.data.total} </Typography>
				</CardContent>
			</Card>
			<Card className='flex flex-row items-center gap-3'>
				<CardHeader className='flex flex-row items-center gap-3'>
					<div className='w-fit rounded-full bg-primary/20 p-2'>
						<DollarSign className='text-primary' />
					</div>
					<CardTitle>Количество проданной продукции</CardTitle>
				</CardHeader>
				<CardContent className='flex flex-1 items-center justify-center p-0'>
					<Typography className='text-2xl font-semibold'>{products?.data.totalSales} </Typography>
				</CardContent>
			</Card>
			<Card className='flex flex-row items-center gap-3'>
				<CardHeader className='flex flex-row items-center gap-3'>
					<div className='w-fit rounded-full bg-primary/20 p-2'>
						<MessageSquareMore className='text-primary' />
					</div>
					<CardTitle>Средняя оценка по отзывам</CardTitle>
				</CardHeader>
				<CardContent className='flex flex-1 items-center justify-center p-0'>
					<Typography className='text-2xl font-semibold'>{Math.round(products?.data.avarageRating || 0)} </Typography>
				</CardContent>
			</Card>
		</section>
	)
}

function StatisticContainerSkeleton() {
	return (
		<section className='my-5 grid grid-cols-3 gap-5'>
			{new Array(3).fill(0).map((el, index) => (
				<Skeleton key={index} className='h-[114px] w-full animate-pulse rounded-lg' />
			))}
		</section>
	)
}
