'use client'

import { Filter, Search, Sliders, X } from 'lucide-react'
import { ComponentProps } from 'react'

import { SearchInput } from '@/components/shared/search-input/SearchInput'
import { Badge, Button, Typography } from '@/components/ui/common'

import { Ingredient } from '@/shared/api/types'
import { cn } from '@/shared/utils/twMerge'

import { Ingredients } from '../Ingredients'

import { FilterMobile } from './FilterMobile'
import { SelectFilter } from './SelectFilter'
import { SelectLimit } from './SelectLimit'
import { SortType } from './sort.type'

interface ProductFilterPanelProps extends ComponentProps<'div'> {
	searchValue: string
	onSearchChange: (value: string) => void
	sortValue: SortType['sortByPrice']
	onSortChange: (value: SortType['sortByPrice']) => void

	onLimitChange: (limit: number) => void

	ingredients: Ingredient[]
	selectedIngredients: string[]
	onIngredientToggle: (ingredientId: string) => void
	isIngredientsLoading: boolean

	isMobileFilterOpen: boolean
	onMobileFilterToggle: (open: boolean) => void

	totalProducts?: number
	currentPage?: number
	totalPages?: number

	isSortDisabled?: boolean
}

export function ProductFilterPanel({
	className,
	searchValue,
	onSearchChange,
	sortValue,
	onSortChange,
	onLimitChange,
	ingredients,
	selectedIngredients,
	onIngredientToggle,
	isIngredientsLoading,
	isMobileFilterOpen,
	onMobileFilterToggle,
	totalProducts = 0,
	currentPage = 1,
	totalPages = 1,
	isSortDisabled = false,
	...props
}: ProductFilterPanelProps) {
	const activeFiltersCount = (selectedIngredients.length > 0 ? 1 : 0) + (sortValue ? 1 : 0)
	const hasActiveFilters = selectedIngredients.length > 0

	const clearAllFilters = () => {
		selectedIngredients.forEach(id => onIngredientToggle(id))
		onSearchChange('')
	}

	return (
		<div className={cn('space-y-6', className)} {...props}>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
						<Sliders className='h-5 w-5 text-primary' />
					</div>
					<div>
						<Typography tag='h3' className='text-lg font-semibold'>
							Поиск и фильтры
						</Typography>
						<Typography tag='p' className='text-sm text-muted-foreground'>
							{totalProducts > 0 ? (
								<>
									Найдено <span className='font-medium text-primary'>{totalProducts}</span> блюд
									{totalPages > 1 && (
										<>
											{' '}
											• Страница {currentPage} из {totalPages}
										</>
									)}
								</>
							) : (
								'Настройте фильтры для поиска'
							)}
						</Typography>
					</div>
				</div>

				{hasActiveFilters && (
					<Button variant='outline' size='sm' onClick={clearAllFilters} className='text-muted-foreground hover:text-destructive'>
						<X className='mr-2 h-4 w-4' />
						Очистить все
					</Button>
				)}
			</div>

			<div className='rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg'>
				<div className='relative space-y-6'>
					<div className='space-y-2'>
						<div className='flex items-center gap-2'>
							<Search size={16} className='text-primary' />
							<Typography tag='span' className='text-sm font-medium text-foreground'>
								Поиск
							</Typography>
						</div>
						<SearchInput searchValue={searchValue} setSearchValue={onSearchChange} />
					</div>

					<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
						<div className='space-y-2'>
							<Typography tag='span' className='text-sm font-medium text-foreground'>
								Сортировка
							</Typography>
							<SelectFilter disabled={isSortDisabled} sort={sortValue} setSort={onSortChange} />
						</div>

						<div className='space-y-2'>
							<Typography tag='span'>На странице</Typography>
							<SelectLimit setLimit={onLimitChange} />
						</div>

						<div className='flex items-end sm:hidden'>
							<FilterMobile
								isPending={isIngredientsLoading}
								ingredients={ingredients}
								setLimit={onLimitChange}
								setSort={onSortChange}
								sort={{ sortByPrice: sortValue, sortByTitle: searchValue }}
								open={isMobileFilterOpen}
								onOpenChange={onMobileFilterToggle}
								selectedIngredients={selectedIngredients}
								toggleIngredient={onIngredientToggle}
								activeFiltersCount={activeFiltersCount}
							/>
						</div>
					</div>

					<div className='hidden space-y-3 sm:block'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-2'>
								<Filter size={16} className='text-primary' />
								<Typography tag='span' className='text-sm font-medium text-foreground'>
									Фильтр по ингредиентам
								</Typography>
								{selectedIngredients.length > 0 && (
									<Badge variant='secondary' className='text-xs'>
										{selectedIngredients.length}
									</Badge>
								)}
							</div>
						</div>

						<Ingredients
							isLoading={isIngredientsLoading}
							take={6}
							selectedIngredients={selectedIngredients}
							handleClickIngredients={onIngredientToggle}
							ingredients={ingredients}
							className='flex flex-wrap items-center gap-2'
						/>
					</div>
					{hasActiveFilters && (
						<div className='rounded-lg bg-primary/5 p-4'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center gap-2'>
									<Typography tag='span' className='text-sm font-medium text-primary'>
										Активные фильтры:
									</Typography>
									<div className='flex flex-wrap gap-1'>
										{selectedIngredients.map(id => {
											const ingredient = ingredients.find(ing => ing.id === id)
											return ingredient ? (
												<Badge
													key={id}
													variant='outline'
													className='border-primary/30 text-xs'
													onClick={() => onIngredientToggle(id)}>
													{ingredient.title}
													<X className='ml-1 h-3 w-3 cursor-pointer' />
												</Badge>
											) : null
										})}
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
