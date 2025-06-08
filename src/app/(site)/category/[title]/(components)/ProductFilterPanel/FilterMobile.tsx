import { Filter, X } from 'lucide-react'
import { ComponentProps } from 'react'

import { Badge, Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, Typography } from '@/components/ui/common'

import { Ingredient } from '@/shared/api/types'

import { Ingredients } from '../Ingredients'

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
	const clearAllFilters = () => {
		selectedIngredients.forEach(id => toggleIngredient(id))
	}

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetTrigger asChild>
				<Button
					variant='outline'
					className='relative flex items-center gap-2 rounded-xl border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80 sm:hidden'>
					Фильтры
					{activeFiltersCount > 0 && (
						<Badge className='absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-primary p-0 text-xs text-primary-foreground'>
							{activeFiltersCount}
						</Badge>
					)}
				</Button>
			</SheetTrigger>

			<SheetContent side='right' className='w-[350px] sm:w-[400px]'>
				<SheetHeader className='space-y-4 pb-6'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
								<Filter className='h-5 w-5 text-primary' />
							</div>
							<div>
								<SheetTitle className='text-lg font-semibold'>Фильтры и сортировка</SheetTitle>
								<Typography tag='p' className='text-sm text-muted-foreground'>
									Настройте поиск блюд
								</Typography>
							</div>
						</div>

						{activeFiltersCount > 0 && (
							<Button variant='outline' size='sm' onClick={clearAllFilters} className='text-muted-foreground hover:text-destructive'>
								<X className='mr-1 h-4 w-4' />
								Очистить
							</Button>
						)}
					</div>
				</SheetHeader>

				<div className='space-y-8'>
					<div className='space-y-4'>
						<div className='flex items-center gap-2'>
							<div className='h-1 w-8 rounded-full bg-primary/30' />
							<Typography tag='h4' className='font-semibold text-foreground'>
								Сортировка
							</Typography>
						</div>
						<SelectFilter sort={sort.sortByPrice} setSort={setSort} className='h-12 rounded-xl border-2' />
					</div>

					<div className='space-y-4'>
						<div className='flex items-center gap-2'>
							<div className='h-1 w-8 rounded-full bg-primary/30' />
							<Typography tag='h4' className='font-semibold text-foreground'>
								Количество на странице
							</Typography>
						</div>
						<SelectLimit setLimit={setLimit} className='h-12 rounded-xl border-2' />
					</div>

					<div className='space-y-4'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-2'>
								<div className='h-1 w-8 rounded-full bg-primary/30' />
								<Typography tag='h4' className='font-semibold text-foreground'>
									Ингредиенты
								</Typography>
								{selectedIngredients.length > 0 && (
									<Badge variant='secondary' className='text-xs'>
										{selectedIngredients.length}
									</Badge>
								)}
							</div>
						</div>

						<div className='rounded-lg border border-border/50 p-4'>
							<Ingredients
								isLoading={isPending}
								selectedIngredients={selectedIngredients}
								handleClickIngredients={toggleIngredient}
								ingredients={ingredients}
								className='grid grid-cols-1 gap-2'
								take={ingredients.length}
							/>
						</div>
					</div>

					{selectedIngredients.length > 0 && (
						<div className='rounded-lg bg-primary/5 p-4'>
							<Typography tag='span' className='mb-3 block text-sm font-medium text-primary'>
								Выбранные ингредиенты:
							</Typography>
							<div className='flex flex-wrap gap-2'>
								{selectedIngredients.map(id => {
									const ingredient = ingredients.find(ing => ing.id === id)
									return ingredient ? (
										<Badge
											key={id}
											variant='outline'
											className='cursor-pointer border-primary/30 text-xs hover:border-destructive/30 hover:bg-destructive/10'
											onClick={() => toggleIngredient(id)}>
											{ingredient.title}
											<X className='ml-1 h-3 w-3' />
										</Badge>
									) : null
								})}
							</div>
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}
