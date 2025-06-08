import { ComponentProps } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/common'

import { cn } from '@/shared/hooks/helpers'

interface SelectLimitProps extends ComponentProps<typeof Select> {
	setLimit: (limit: number) => void
	className?: string
}

const limitOptions = [
	{ value: 5, label: '5 товаров' },
	{ value: 10, label: '10 товаров' },
	{ value: 15, label: '15 товаров' },
	{ value: 20, label: '20 товаров' }
]

export const SelectLimit = ({ setLimit, className, ...props }: SelectLimitProps) => {
	return (
		<Select onValueChange={value => setLimit(Number(value))} {...props}>
			<SelectTrigger className={cn('', className)}>
				<SelectValue placeholder='Товаров на странице' />
			</SelectTrigger>
			<SelectContent>
				{limitOptions.map(option => {
					return (
						<SelectItem key={option.value} value={String(option.value)} className=''>
							{option.label}
						</SelectItem>
					)
				})}
			</SelectContent>
		</Select>
	)
}
