import { Filter } from 'lucide-react'
import { ComponentProps } from 'react'

import { Ingredients } from '@/app/(public)/menu/[id]/(components)/Ingredients'

import { Button, Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/common'

interface FilterMobileProps extends ComponentProps<typeof Sheet> {
	activeFiltersCount: number
	selectedIngredients: string[]
	toggleIngredient: (ingredientId: string) => void
	categoryId: string
}

export const FilterMobile = ({ open, onOpenChange, activeFiltersCount, selectedIngredients, toggleIngredient, categoryId }: FilterMobileProps) => {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetTrigger asChild>
				<Button
					variant='outline'
					className='flex items-center gap-2 rounded-xl border-neutral-200 bg-white/50 backdrop-blur-sm transition-colors hover:bg-white/80 sm:hidden'>
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
				<div className='mt-5 flex space-y-8'>
					<Ingredients
						selectedIngredients={selectedIngredients}
						handleClickIngredients={toggleIngredient}
						categoryId={categoryId}
						className='grid'
					/>
				</div>
			</SheetContent>
		</Sheet>
	)
}
