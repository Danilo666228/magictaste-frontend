'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/common'

import { useGetStatisticSale } from '@/shared/api/hooks/statisctics/useGetStatisticSale'
import { DollarSign, SquareArrowLeft } from 'lucide-react'

const chartConfig = {
	sale: {
		label: 'Продажи',
		color: 'hsl(var(--chart-5))',
		icon : DollarSign
	}
} satisfies ChartConfig

export function ChartDynamicStatistics() {
	const { data: statistics } = useGetStatisticSale({ config: { params: { period: 'week' } } })

	return (
		<Card>
			<CardHeader className='relative flex flex-row justify-between'>
				<div className='flex items-center gap-3'>
					<CardTitle>Все продажи</CardTitle>
					<CardDescription>
						<span className=''>за неделю</span>
					</CardDescription>
				</div>
			</CardHeader>

			<CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
				<ChartContainer config={chartConfig} className='aspect-auto h-[250px] w-full'>
					<AreaChart data={statistics?.data}>
						<defs>
							<linearGradient id='fillSale' x1='0' y1='0' x2='0' y2='1'>
								<stop offset='5%' stopColor='var(--color-sale)' stopOpacity={1.0} />
								<stop offset='95%' stopColor='var(--color-sale)' stopOpacity={0.1} />
							</linearGradient>
							<linearGradient id='fillMobile' x1='0' y1='0' x2='0' y2='1'>
								<stop offset='5%' stopColor='var(--color-sale)' stopOpacity={0.8} />
								<stop offset='95%' stopColor='var(--color-sale)' stopOpacity={0.1} />
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='date'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={value => {
								const date = new Date(value)
								return date.toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric'
								})
							}}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={value => {
										return new Date(value).toLocaleDateString('en-US', {
											month: 'short',
											day: 'numeric'
										})
									}}
									indicator='line'
								/>
							}
						/>
						<Area dataKey='sale' type='bump' fill='url(#fillMobile)' stroke='var(--color-sale)' stackId='a' />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
