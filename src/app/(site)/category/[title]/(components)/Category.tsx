'use client'

import { keepPreviousData } from '@tanstack/react-query'
import { Search, Sparkles } from 'lucide-react'
import { useState } from 'react'

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Typography } from '@/components/ui/common'

import { useGetIngredientByCategoryQuery } from '@/shared/api/hooks/ingredient/useGetIngredientByCategoryQuery'
import { useGetProductsQuery } from '@/shared/api/hooks/products/useGetProductsQuery'
import { Category as CategoryType } from '@/shared/api/types/category'
import { useDebounceValue } from '@/shared/hooks'

import { ProductList, ProductListSkeleton } from '../../(components)/ProductList'

import { ProductFilterPanel, SortType } from './ProductFilterPanel'

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
			<section className='relative mb-16 overflow-hidden rounded-3xl border border-border/50 bg-card/50'>
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

			<ProductFilterPanel
				searchValue={sort.sortByTitle}
				onSearchChange={handleSortByTitle}
				sortValue={sort.sortByPrice}
				onSortChange={handleSetSortByPrice}
				onLimitChange={handleSetLimit}
				ingredients={ingredientQuery.data?.data || []}
				selectedIngredients={selectedIngredients}
				onIngredientToggle={toggleIngredient}
				isIngredientsLoading={ingredientQuery.isPending}
				isMobileFilterOpen={isFilterOpen}
				onMobileFilterToggle={setIsFilterOpen}
				totalProducts={productQuery.data?.data?.total || 0}
				currentPage={currentPage}
				totalPages={totalPages}
				isSortDisabled={productQuery.data?.data.total === 1}
				className='mb-12'
			/>

			<div className='space-y-8'>
				{productQuery.isPending ? (
					<ProductListSkeleton />
				) : productQuery.data?.data && productQuery.data.data.products.length > 0 ? (
					<>
						<div className='rounded-lg border border-border/50 bg-card/50 p-5'>
							<ProductList products={productQuery.data.data.products} className='justify-start' />
						</div>

						{totalPages > 1 && (
							<div className='flex justify-center'>
								<Pagination>
									<PaginationContent>
										<PaginationPrevious
											onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
											className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
										/>
										{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
											<PaginationItem key={page}>
												<PaginationLink onClick={() => setCurrentPage(page)} isActive={page === currentPage}>
													{page}
												</PaginationLink>
											</PaginationItem>
										))}
										<PaginationNext
											onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
											className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
										/>
									</PaginationContent>
								</Pagination>
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
