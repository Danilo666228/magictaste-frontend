import { LucideIcon } from 'lucide-react'

import { Card, Typography } from '@/components/ui/common'

interface CardStatisticProps {
	title: string
	value: string | number
	icon: LucideIcon
	description: string
}

export function CardStatistic({ title, value, icon: Icon, description }: CardStatisticProps) {
	return (
		<Card className='p-6'>
			<div className='flex items-center justify-between'>
				<div>
					<Typography className='text-sm font-medium text-muted-foreground'>{title}</Typography>
					<Typography className='mt-2 text-2xl font-bold'>{value}</Typography>
					<Typography className='mt-1 text-xs text-muted-foreground'>{description}</Typography>
				</div>
				<div className='rounded-lg bg-primary/10 p-3'>
					<Icon className='h-6 w-6 text-primary' />
				</div>
			</div>
		</Card>
	)
}
