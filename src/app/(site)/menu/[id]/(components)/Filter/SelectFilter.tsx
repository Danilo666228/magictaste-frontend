import { ComponentProps } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/common'

import { cn } from '@/lib/utils'

import { SortType } from './sort.type'

interface SelectFilterProps extends ComponentProps<typeof Select> {
	sort: SortType['sortByPrice']
	setSort: (value: 'asc' | 'desc') => void
	className?: string
}

export const SelectFilter = ({ sort, setSort, disabled, className, ...props }: SelectFilterProps) => {
	return (
		<Select disabled={disabled} value={sort} onValueChange={setSort} {...props}>
			<SelectTrigger className={cn('w-[200px] border-neutral-200 bg-white/50 backdrop-blur-sm transition-colors hover:bg-white/80', className)}>
				<SelectValue placeholder='Сортировка' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='asc'>По возрастанию цены</SelectItem>
				<SelectItem value='desc'>По убыванию цены</SelectItem>
			</SelectContent>
		</Select>
	)
}
