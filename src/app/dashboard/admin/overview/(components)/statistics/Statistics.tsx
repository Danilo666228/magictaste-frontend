'use client'

import { DollarSign, ShoppingCart, UserRound } from 'lucide-react'
import { useState } from 'react'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/common'

import { useGetDashboardStatistics } from '@/shared/api/hooks/statisctics/useGetDashboardStatisctics'

import { CardStatistic } from './CardStatistic'
import { ChartDinamycSales } from './ChartDynamicSales/ChartDinamycSales'
import { ChartDynamicStatistics } from './ChartDynamicStatistics'
import { ChartListActivity } from './ChartListActivity/ChartListActivity'

export function Statisctics() {
	const [period, setPeriod] = useState<string>('week')

	const { data: statistics, isLoading } = useGetDashboardStatistics({
		config: { params: { period } }
	})

	const calculatePercentageChange = (current: number, previous: number): number => {
		if (previous === 0) return current > 0 ? 100 : 0
		return Number((((current - previous) / previous) * 100).toFixed(1))
	}

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
				<CardStatistic
					title='Доход'
					Icon={DollarSign}
					value={statistics?.data.sales.salesAmount || 0}
					percentage={changes.revenue}
				/>
				<CardStatistic
					title='Продажи'
					Icon={ShoppingCart}
					value={statistics?.data.sales.totalSales || 0}
					percentage={changes.sales}
				/>
				<CardStatistic
					title='Клиенты'
					Icon={UserRound}
					value={statistics?.data.customers.totalCustomers || 0}
					percentage={statistics?.data.customers.comparison.previousNewCustomers || 0}
				/>
			</div>
			<ChartDynamicStatistics />

			<div className='grid gap-4 md:grid-cols-2'>
				<div className='h-[600px]'>
					<ChartDinamycSales
						period={period as 'day' | 'week' | 'month' | 'year'}
						isLoading={isLoading}
						sales={statistics?.data.sales}
						customers={statistics?.data.customers}
					/>
				</div>
				<ChartListActivity activityFeed={statistics?.data.activityFeed ?? []} />
			</div>
		</div>
	)
}
