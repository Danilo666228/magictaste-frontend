import { motion } from 'framer-motion'
import { ArrowDown, ArrowUp, LucideIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/common'

interface CardStatisticProps {
	title: string
	Icon?: LucideIcon
	value: number
	percentage: number
}

export function CardStatistic({ title, Icon, value, percentage }: CardStatisticProps) {
	const isPositive = percentage >= 0

	return (
		<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
			<Card className='overflow-hidden border transition-shadow duration-300 hover:shadow-lg'>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-semibold tracking-tight'>{title}</CardTitle>
					{Icon && (
						<div className='rounded-full bg-slate-100 p-2 dark:bg-slate-800'>
							<Icon className='h-4 w-4 text-primary' />
						</div>
					)}
				</CardHeader>
				<CardContent>
					<motion.div
						initial={{ scale: 0.9 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.5 }}
						className='mb-2 text-3xl font-bold'>
						{value.toLocaleString()}
					</motion.div>
					<div className='flex items-center gap-2 text-sm'>
						<div
							className={`flex items-center justify-center rounded-md p-1 ${isPositive ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-rose-100 dark:bg-rose-900/30'}`}>
							{isPositive ? <ArrowUp className='h-3 w-3 text-emerald-500' /> : <ArrowDown className='h-3 w-3 text-rose-500' />}
							<span
								className={`ml-1 px-1 text-xs font-medium ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
								{Math.abs(percentage)}%
							</span>
						</div>
						<p className='text-xs text-muted-foreground'>с прошлого периода</p>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)
}
