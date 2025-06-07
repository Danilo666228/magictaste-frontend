'use client'

import { keepPreviousData } from '@tanstack/react-query'
import { Filter, Search, Sparkles } from 'lucide-react'
import { useState } from 'react'

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Typography } from '@/components/ui/common'
import { SearchInput } from '@/components/ui/elements/input/SearchInput'

import { useGetIngredientByCategoryQuery } from '@/shared/api/hooks/ingredient/useGetIngredientByCategoryQuery'
import { useGetProductsQuery } from '@/shared/api/hooks/products/useGetProductsQuery'
import { Category as CategoryType } from '@/shared/api/types/category'
import { useDebounceValue } from '@/shared/hooks'

import { ProductList, ProductListSkeleton } from '../../(components)/ProductList'

import { FilterMobile } from './Filter/FilterMobile'
import { SelectFilter } from './Filter/SelectFilter'
import { SelectLimit } from './Filter/SelectLimit'
import { SortType } from './Filter/sort.type'
import { Ingredients } from './Ingredients'

interface MenuCategoryProps {
	category: CategoryType
}

export function Category({ category }: MenuCategoryProps) {
	const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
	const [limit, setLimit] = useState<number>(5)
	const [sort, setSort] = useState<SortType>({
		sortByPrice: 'asc',
		sortByTitle: ''
	})
	const [currentPage, setCurrentPage] = useState(1)
	const debouncedSearch = useDebounceValue(sort.sortByTitle, 500)
	const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
	const ingredientQuery = useGetIngredientByCategoryQuery({
		categoryId: category.id
	})
	const productQuery = useGetProductsQuery({
		config: {
			params: {
				categoryId: category.id,
				search: debouncedSearch,
				ingredientId: selectedIngredients,
				orderBy: sort.sortByPrice,
				page: currentPage,
				limit
			}
		},
		options: {
			placeholderData: keepPreviousData
		}
	})
	const totalPages = productQuery.data?.data?.totalPages || 1

	const toggleIngredient = (ingredientId: string) => {
		setSelectedIngredients(prev => (prev.includes(ingredientId) ? prev.filter(id => id !== ingredientId) : [...prev, ingredientId]))
		setCurrentPage(1)
	}

	const activeFiltersCount = (selectedIngredients.length > 0 ? 1 : 0) + (sort.sortByPrice ? 1 : 0)

	const handleSetLimit = (value: number) => {
		setLimit(value)
		setCurrentPage(1)
	}

	const handleSetSortByPrice = (value: SortType['sortByPrice']) => {
		setSort(prev => ({ ...prev, sortByPrice: value }))
		setCurrentPage(1)
	}

	const handleSortByTitle = (value: SortType['sortByTitle']) => {
		setSort(prev => ({ ...prev, sortByTitle: value }))
		setCurrentPage(1)
	}

	return (
		<div className='relative min-h-screen px-4 py-8 sm:px-6 lg:px-8'>
			<section className='relative mb-16 overflow-hidden rounded-3xl border'>
				<div className='relative z-10 px-8 py-5'>
					<div className='mb-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm'>
						<Sparkles size={16} className='animate-pulse' />
						Категория меню
					</div>

					<div className='max-w-4xl space-y-6'>
						<Typography tag='h1' className='text-4xl font-bold sm:text-5xl lg:text-6xl'>
							<span className='bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>{category.title}</span>
						</Typography>
						<Typography className='max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl' tag='p'>
							Откройте для себя наши <span className='font-semibold text-primary'>изысканные блюда</span>, приготовленные из свежих
							ингредиентов по традиционным рецептам
						</Typography>
					</div>
				</div>
			</section>

			<div className='mb-12 space-y-6'>
				<div className='flex flex-col gap-4 rounded-2xl border p-4'>
					<div className='flex items-center gap-2'>
						<Filter size={20} className='text-primary' />
						<Typography tag='h3' className='text-lg font-semibold text-foreground'>
							Поиск и фильтры
						</Typography>
					</div>

					<div className='flex items-start justify-between gap-4'>
						<div className='flex flex-col gap-4'>
							<SearchInput searchValue={sort.sortByTitle} setSearchValue={handleSortByTitle} />
							<div className='flex gap-4'>
								<SelectFilter disabled={productQuery.data?.data.total === 1} sort={sort.sortByPrice} setSort={handleSetSortByPrice} />
								<SelectLimit setLimit={handleSetLimit} />
								<FilterMobile
									isPending={ingredientQuery.isPending}
									ingredients={ingredientQuery.data?.data || []}
									setLimit={handleSetLimit}
									setSort={handleSetSortByPrice}
									sort={sort}
									open={isFilterOpen}
									onOpenChange={setIsFilterOpen}
									selectedIngredients={selectedIngredients}
									toggleIngredient={toggleIngredient}
									activeFiltersCount={activeFiltersCount}
								/>
								<Ingredients
									isPending={ingredientQuery.isPending}
									take={4}
									selectedIngredients={selectedIngredients}
									handleClickIngredients={toggleIngredient}
									ingredients={ingredientQuery.data?.data || []}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='space-y-8'>
				{productQuery.isPending ? (
					<ProductListSkeleton />
				) : productQuery.data?.data && productQuery.data.data.products.length > 0 ? (
					<>
						<div className='space-y-4'>
							<div className='flex items-center justify-between'>
								<Typography tag='h2' className='text-xl font-semibold text-foreground'>
									Найдено <span className='text-primary'>{productQuery.data.data.total}</span> блюд
								</Typography>
								<div className='text-sm text-muted-foreground'>
									Страница {currentPage} из {totalPages}
								</div>
							</div>
							<ProductList products={productQuery.data.data.products} className='justify-start' />
						</div>

						{totalPages > 1 && (
							<div className='flex justify-center pt-8'>
								<div className='rounded-2xl bg-background/60 p-4 shadow-lg backdrop-blur-sm'>
									<Pagination>
										<PaginationContent>
											<PaginationItem>
												<PaginationPrevious
													onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
													className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-primary/10'}
												/>
											</PaginationItem>
											{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
												<PaginationItem key={page}>
													<PaginationLink
														onClick={() => setCurrentPage(page)}
														isActive={currentPage === page}
														className={
															currentPage === page ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'
														}>
														{page}
													</PaginationLink>
												</PaginationItem>
											))}
											<PaginationItem>
												<PaginationNext
													onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
													className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-primary/10'}
												/>
											</PaginationItem>
										</PaginationContent>
									</Pagination>
								</div>
							</div>
						)}
					</>
				) : (
					<div className='flex flex-col items-center justify-center rounded-3xl bg-background/60 py-20 text-center shadow-lg backdrop-blur-sm'>
						<div className='mb-8 flex justify-center'>
							<div className='relative'>
								<div className='flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20 shadow-lg'>
									<Search className='h-10 w-10 text-muted-foreground' />
								</div>
								<div className='absolute -right-2 -top-2 flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-primary/20'>
									<Sparkles className='h-4 w-4 text-primary' />
								</div>
							</div>
						</div>

						<div className='space-y-4'>
							<Typography tag='h3' className='text-2xl font-bold'>
								<span className='bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
									Ничего не найдено
								</span>
							</Typography>
							<Typography tag='p' className='max-w-md leading-relaxed text-muted-foreground'>
								Попробуйте изменить параметры поиска или фильтры. Возможно, то, что вы ищете, находится в другой категории.
							</Typography>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
