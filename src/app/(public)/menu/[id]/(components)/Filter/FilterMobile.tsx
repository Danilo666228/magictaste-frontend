import { Filter } from 'lucide-react'
import { ComponentProps } from 'react'

import { Ingredients } from '@/app/(public)/menu/[id]/(components)/Ingredients'

import { Button, Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/common'

import { Ingredient } from '@/shared/api/types'

import { SelectFilter } from './SelectFilter'
import { SelectLimit } from './SelectLimit'
import { SortType } from './sort.type'

interface FilterMobileProps extends ComponentProps<typeof Sheet> {
	sort: SortType
	setSort: (value: 'asc' | 'desc') => void
	setLimit: (limit: number) => void
	ingredients: Ingredient[]
	activeFiltersCount: number
	selectedIngredients: string[]
	toggleIngredient: (ingredientId: string) => void
	isPending: boolean
}

export const FilterMobile = ({
	open,
	onOpenChange,
	activeFiltersCount,
	selectedIngredients,
	toggleIngredient,
	setSort,
	sort,
	setLimit,
	isPending,
	ingredients
}: FilterMobileProps) => {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetTrigger asChild>
				<Button
					variant='outline'
					className='flex items-center gap-2 border-neutral-200 bg-white/50 backdrop-blur-sm transition-colors hover:bg-white/80 sm:hidden'>
					<Filter size={16} />
					<span>Фильтры</span>
					{activeFiltersCount > 0 && (
						<span className='ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs text-white'>
							{activeFiltersCount}
						</span>
					)}
				</Button>
			</SheetTrigger>
			<SheetContent side='right' className='w-[300px] sm:w-[400px]'>
				<SheetTitle>Фильтры</SheetTitle>
				<div className='mt-5 flex flex-col space-y-8'>
					<SelectFilter sort={sort.sortByPrice} setSort={setSort} />
					<SelectLimit setLimit={setLimit} />
					<Ingredients
						isPending={isPending}
						selectedIngredients={selectedIngredients}
						handleClickIngredients={toggleIngredient}
						ingredients={ingredients}
						className='grid'
						take={4}
					/>
				</div>
			</SheetContent>
		</Sheet>
	)
}
