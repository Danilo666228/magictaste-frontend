'use client'

import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useFormatter } from 'next-intl'
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	Skeleton
} from '@/components/ui/common'

import { DashboardStatisticsData } from '@/shared/api/types/statistics'

import { chartConfig } from './chart.config'
import { chartData } from './chart.data'

interface ChartDinamycSalesProps {
	period: 'day' | 'week' | 'month' | 'year'
	isLoading: boolean
	sales: DashboardStatisticsData['sales'] | undefined
	customers: DashboardStatisticsData['customers'] | undefined
}

export function ChartDinamycSales({ period, isLoading, sales, customers }: ChartDinamycSalesProps) {
	const format = useFormatter()

	return (
		<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
			<Card className='overflow-hidden border-none shadow-md'>
				<CardHeader className='bg-gradient-to-r from-blue-500/10 to-indigo-500/10 pb-8'>
					<div className='flex items-center justify-between'>
						<div>
							<CardTitle className='text-lg font-semibold'>Динамика продаж</CardTitle>
							<CardDescription className='text-sm opacity-80'>
								Сравнение продаж за{' '}
								{period === 'day' ? 'день' : period === 'week' ? 'неделю' : period === 'month' ? 'месяц' : 'год'}
							</CardDescription>
						</div>
						<ShoppingBag className='h-5 w-5 text-blue-500' />
					</div>
				</CardHeader>
				<CardContent className='mt-auto'>
					{isLoading ? (
						<div className='flex h-[350px] w-full items-center justify-center'>
							<Skeleton className='h-[300px] w-full animate-pulse rounded-lg' />
						</div>
					) : (
						<ChartContainer className='' config={chartConfig}>
							<BarChart className='' accessibilityLayer data={chartData(sales?.totalSales ?? 0, customers?.totalCustomers ?? 0)}>
								<CartesianGrid vertical={false} />
								<XAxis dataKey='name' tickLine={false} tickMargin={10} axisLine={false} tickFormatter={value => value} />
								<ChartTooltip content={<ChartTooltipContent formatter={(value) => format.number(Number(value))} />} />
								<Bar
									dataKey='value'
									strokeWidth={2}
									radius={10}
									activeIndex={2}
									activeBar={({ ...props }) => (
										<Rectangle
											{...props}
											fillOpacity={0.8}
											stroke={props.payload.fill}
											strokeDasharray={4}
											strokeDashoffset={4}
										/>
									)}
								/>
							</BarChart>
						</ChartContainer>
					)}
					<div className='mt-4 flex justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-900/30'>
						{!isLoading &&
							chartData(sales?.totalSales ?? 0, customers?.totalCustomers ?? 0).map((item, index) => (
								<div key={index} className='flex flex-col items-center'>
									<div className='flex items-center gap-2'>
										<div className='h-3 w-3 rounded-full' style={{ backgroundColor: item.fill }} />
										<span className='text-xs font-medium'>{item.name}</span>
									</div>
									<span className='mt-1 text-sm font-semibold'>{format.number(item?.value || 0)}</span>
								</div>
							))}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)
}
