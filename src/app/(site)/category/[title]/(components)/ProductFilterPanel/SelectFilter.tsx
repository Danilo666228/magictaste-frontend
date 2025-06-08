import { ComponentProps } from 'react'

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Typography } from '@/components/ui/common'

import { cn } from '@/shared/hooks/helpers'

import { SortType } from './sort.type'

interface SelectFilterProps extends ComponentProps<typeof Select> {
	sort: SortType['sortByPrice']
	setSort: (value: 'asc' | 'desc') => void
	className?: string
}

const sortOptions = [
	{
		value: 'asc' as const,
		label: 'Сначала дешевые'
	},
	{
		value: 'desc' as const,
		label: 'Сначала дорогие'
	}
]

export const SelectFilter = ({ sort, setSort, disabled, className, ...props }: SelectFilterProps) => {
	return (
		<Select disabled={disabled} value={sort} onValueChange={setSort} {...props}>
			<SelectTrigger className={cn('', className)}>
				<SelectValue placeholder='Сортировка по цене' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>По цене</SelectLabel>
					{sortOptions.map(option => (
						<SelectItem key={option.value} value={option.value}>
							<Typography className=''>{option.label}</Typography>
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
