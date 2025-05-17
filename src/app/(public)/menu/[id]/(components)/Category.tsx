'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'

import { FilterMobile } from '@/app/(public)/menu/[id]/(components)/Filter/FilterMobile'
import { SelectFilter } from '@/app/(public)/menu/[id]/(components)/Filter/SelectFilter'

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Typography } from '@/components/ui/common'
import { SearchInput } from '@/components/ui/elements/input/SearchInput'

import { useGetIngredientByCategoryQuery } from '@/shared/api/hooks/ingredient/useGetIngredientByCategoryQuery'
import { useGetProductsQuery } from '@/shared/api/hooks/products/useGetProductsQuery'
import { Category as CategoryType } from '@/shared/api/types/category'
import { useDebounceValue } from '@/shared/hooks'

import { ProductList, ProductListSkeleton } from '../../(components)/ProductList'

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
		<div className='px-4 py-8 sm:px-6 lg:px-8'>
			<section className='relative mb-12 rounded-lg border shadow-md'>
				<div className='relative z-10 px-8 py-16 sm:py-20'>
					<div className='max-w-3xl'>
						<Typography
							className='bg-gradient-to-r from-primary to-primary/10 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl'
							tag='h1'>
							{category.title}
						</Typography>
						<Typography className='mt-6 text-lg font-medium leading-relaxed text-amber-900/70 sm:text-xl' tag='p'>
							Откройте для себя наши изысканные блюда, приготовленные из свежих ингредиентов по традиционным рецептам
						</Typography>
					</div>
				</div>
			</section>

			<div className='mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
				<SearchInput searchValue={sort.sortByTitle} setSearchValue={handleSortByTitle} />
				<div className='flex gap-4'>
					<SelectFilter
						className='max-sm:hidden'
						disabled={productQuery.data?.data.total === 1}
						sort={sort.sortByPrice}
						setSort={handleSetSortByPrice}
					/>
					<SelectLimit className='max-sm:hidden' setLimit={handleSetLimit} />
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
				</div>
			</div>
			<div className='mb-8 hidden sm:block'>
				<Ingredients
					isPending={ingredientQuery.isPending}
					take={4}
					selectedIngredients={selectedIngredients}
					handleClickIngredients={toggleIngredient}
					ingredients={ingredientQuery.data?.data || []}
				/>
			</div>
			<div className='mt-8'>
				{productQuery.isPending ? (
					<ProductListSkeleton />
				) : productQuery.data?.data && productQuery.data.data.products.length > 0 ? (
					<>
						<ProductList products={productQuery.data.data.products} />
						<div className='mt-8'>
							<Pagination>
								<PaginationContent>
									<PaginationItem>
										<PaginationPrevious
											onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
											className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
										/>
									</PaginationItem>
									{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
										<PaginationItem key={page}>
											<PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page}>
												{page}
											</PaginationLink>
										</PaginationItem>
									))}
									<PaginationItem>
										<PaginationNext
											onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
											className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
										/>
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</div>
					</>
				) : (
					<div className='flex flex-col items-center justify-center rounded-2xl bg-white/50 py-16 text-center backdrop-blur-sm'>
						<Search className='mb-6 h-16 w-16 text-neutral-300' />
						<Typography tag='h3' className='text-xl font-semibold text-neutral-800'>
							Ничего не найдено
						</Typography>
						<Typography tag='p' className='mt-3 text-neutral-600'>
							Попробуйте изменить параметры поиска или фильтры
						</Typography>
					</div>
				)}
			</div>
		</div>
	)
}
