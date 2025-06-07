import { ComponentProps } from 'react'

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/common'

import { cn } from '@/shared/hooks/helpers'

import { SortType } from './sort.type'

interface SelectFilterProps extends ComponentProps<typeof Select> {
	sort: SortType['sortByPrice']
	setSort: (value: 'asc' | 'desc') => void
	className?: string
}

export const SelectFilter = ({ sort, setSort, disabled, className, ...props }: SelectFilterProps) => {
	return (
		<Select disabled={disabled} value={sort} onValueChange={setSort} {...props}>
			<SelectTrigger className={cn('w-[200px] backdrop-blur-sm transition-colors', className)}>
				<SelectValue placeholder='Сортировка' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel className='text-sm'>По цене</SelectLabel>
					<SelectItem value='asc'>По возрастанию</SelectItem>
					<SelectItem value='desc'>По убыванию</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
