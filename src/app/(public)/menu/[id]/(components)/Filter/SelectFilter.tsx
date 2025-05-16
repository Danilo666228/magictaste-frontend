import { ComponentProps } from 'react'

import {
	Badge,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/common'

import { SortType } from './sort.type'

interface SelectFilterProps extends ComponentProps<typeof Select> {
	sort: SortType['sortByPrice']
	setSort: (value: 'asc' | 'desc') => void
}

export const SelectFilter = ({ sort, setSort, disabled, ...props }: SelectFilterProps) => {
	return (
		<Select disabled={disabled} value={sort} onValueChange={setSort} {...props}>
			<SelectTrigger className='w-[200px] rounded-xl border-neutral-200 bg-white/50 backdrop-blur-sm transition-colors hover:bg-white/80'>
				<SelectValue placeholder='Сортировка' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='asc'>По возрастанию цены</SelectItem>
				<SelectItem value='desc'>По убыванию цены</SelectItem>
			</SelectContent>
		</Select>
	)
}
