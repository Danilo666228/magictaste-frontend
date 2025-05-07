import { CreditCard } from 'lucide-react'
import { useFormatter } from 'next-intl'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, Skeleton } from '@/components/ui/common'

import { DashboardStatisticsData } from '@/shared/api/types/statistics'

interface ChartPaymentMethodProps {
	isLoading: boolean
	paymentMethods: DashboardStatisticsData['paymentMethods']
}
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00C49F']
export function ChartPaymentMethod({ isLoading, paymentMethods }: ChartPaymentMethodProps) {
	const format = useFormatter()

	return (
		<Card className='overflow-hidden border-none shadow-md'>
			<CardHeader className='bg-gradient-to-r from-indigo-500/10 to-purple-500/10 pb-8'>
				<div className='flex items-center justify-between'>
					<div>
						<CardTitle className='text-lg font-semibold'>Методы оплаты</CardTitle>
						<CardDescription className='text-sm opacity-80'>Распределение по способам оплаты</CardDescription>
					</div>
					<CreditCard className='h-5 w-5 text-indigo-500' />
				</div>
			</CardHeader>
			<CardContent className=''>
				{isLoading ? (
					<div className='flex h-[220px] w-full items-center justify-center'>
						<Skeleton className='h-[220px] w-[220px] animate-pulse rounded-full' />
					</div>
				) : (
					<div className='flex h-[340px] items-center justify-center'>
						<ResponsiveContainer width='100%' height='100%'>
							<PieChart>
								<defs>
									{COLORS.map((color, index) => (
										<linearGradient key={`gradient-${index}`} id={`colorGradient${index}`} x1='0' y1='0' x2='0' y2='1'>
											<stop offset='0%' stopColor={color} stopOpacity={0.9} />
											<stop offset='100%' stopColor={color} stopOpacity={0.7} />
										</linearGradient>
									))}
								</defs>
								<Pie
									data={paymentMethods || []}
									cx='50%'
									cy='50%'
									labelLine={false}
									outerRadius={90}
									innerRadius={40}
									paddingAngle={3}
									fill='#8884d8'
									dataKey='count'
									nameKey='method'
									label={({ method, percent }) => {
										const methodLabels = {
											CARD: 'Карта',
											CASH: 'Наличные',
											ONLINE: 'Онлайн'
										}
										const displayName = methodLabels[method as keyof typeof methodLabels] || method
										return `${displayName}: ${(percent * 100).toFixed(0)}%`
									}}
									strokeWidth={1}
									stroke='#ffffff'>
									{paymentMethods.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={`url(#colorGradient${index})`}
											className='cursor-pointer transition-opacity hover:opacity-80'
										/>
									))}
								</Pie>
								<Tooltip
									contentStyle={{
										backgroundColor: 'rgba(255, 255, 255, 0.9)',
										borderRadius: '8px',
										boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
										border: 'none',
										padding: '8px 12px'
									}}
									formatter={(value, name) => {
										const methodLabels = {
											CARD: 'Карта',
											CASH: 'Наличные',
											ONLINE: 'Онлайн'
										}
										return [
											<span className='font-medium'>{value} заказов</span>,
											<span className='text-gray-600'>{methodLabels[name as keyof typeof methodLabels] || name}</span>
										]
									}}
								/>
							</PieChart>
						</ResponsiveContainer>
					</div>
				)}
				<div className='mt-6 space-y-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-900/30'>
					{isLoading ? (
						<div className='space-y-2'>
							{[1, 2, 3].map(i => (
								<Skeleton key={i} className='h-6 w-full' />
							))}
						</div>
					) : (
						paymentMethods.map((stat, index) => (
							<div
								key={stat.method}
								className='flex items-center justify-between rounded p-1 text-sm transition-colors dark:hover:bg-gray-800/50'>
								<div className='flex items-center'>
									<div
										className='mr-3 h-4 w-4 rounded-full shadow-sm'
										style={{
											background: `linear-gradient(135deg, ${COLORS[index % COLORS.length]}, ${COLORS[(index + 1) % COLORS.length]}80)`
										}}
									/>
									<span className='font-medium'>
										{stat.method === 'CARD' ? 'Карта' : stat.method === 'CASH' ? 'Наличные' : 'Онлайн'}
									</span>
								</div>
								<div className='flex flex-col items-end'>
									<span className='font-semibold'>{format.number(stat.total)}</span>
									<span className='text-xs text-gray-500'>{stat.count} заказов</span>
								</div>
							</div>
						))
					)}
				</div>
			</CardContent>
		</Card>
	)
}
