import { ComponentProps } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/common'

import { cn } from '@/lib/utils'

interface SelectLimitProps extends ComponentProps<typeof Select> {
	setLimit: (limit: number) => void
	className?: string
}

export const SelectLimit = ({ setLimit, className, ...props }: SelectLimitProps) => {
	return (
		<Select onValueChange={value => setLimit(Number(value))} {...props}>
			<SelectTrigger className={cn('w-fit flex items-center gap-2', className)}>
				<SelectValue placeholder='Товаров на странице' />
			</SelectTrigger>
			<SelectContent>
				{[5, 10, 15, 20].map(limit => (
					<SelectItem key={limit} value={String(limit)}>
						{limit + ' товаров'}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
