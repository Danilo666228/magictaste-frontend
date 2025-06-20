'use client'

import { DollarSign, MessageSquareMore, ShoppingBasket } from 'lucide-react'
import { ComponentProps } from 'react'

import { Card, CardContent, CardHeader, CardTitle, Typography } from '@/components/ui/common'

import { useGetProductsStatisticsQuery } from '@/shared/api/hooks/statisctics/useGetProductsStatistics'

interface StatisticContainerProps extends ComponentProps<'section'> {}

export function StatisticContainer({ className, ...props }: StatisticContainerProps) {
	const { data: products } = useGetProductsStatisticsQuery()
	const statistics = [
		{
			icon: <ShoppingBasket className='text-primary' />,
			title: 'Общее количество продукции',
			value: products?.data.total || 0
		},
		{
			icon: <DollarSign className='text-primary' />,
			title: 'Количество проданной продукции',
			value: products?.data.totalSales || 0
		},
		{
			icon: <MessageSquareMore className='text-primary' />,
			title: 'Средняя оценка по отзывам',
			value: Math.round(products?.data.avarageRating || 0)
		}
	]
	return (
		<section className={`my-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 ${className}`} {...props}>
			{statistics.map((stat, index) => (
				<Card key={index} className={`flex flex-col items-center gap-3 sm:flex-row ${className}`}>
					<CardHeader className='flex flex-row items-center gap-3 p-4 sm:p-6'>
						<div className='w-fit rounded-full bg-primary/20 p-2'>{stat.icon}</div>
						<CardTitle className='text-sm sm:text-base'>{stat.title}</CardTitle>
					</CardHeader>
					<CardContent className='flex flex-1 items-center justify-center p-0 px-2 sm:px-6'>
						<Typography className='text-xl font-semibold sm:text-2xl'>{stat.value}</Typography>
					</CardContent>
				</Card>
			))}
		</section>
	)
}
