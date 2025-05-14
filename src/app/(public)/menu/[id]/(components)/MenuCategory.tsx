'use client'

import { Filter, Search } from 'lucide-react'
import { useState } from 'react'

import {
	Button,
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
	Typography
} from '@/components/ui/common'

import { useGetProductsQuery } from '@/shared/api/hooks/products/useGetProductsQuery'
import { Category } from '@/shared/api/types/category'
import { useDebounceValue } from '@/shared/hooks'

import { ProductList, ProductListSkeleton } from '../../(components)/ProductList'
import { SearchInput } from '../../../../../components/ui/elements/input/SearchInput'

import { Ingredients } from './Ingredients'

interface MenuCategoryProps {
	category: Category
}

export function MenuCategory({ category }: MenuCategoryProps) {
	const [searchValue, setSearchValue] = useState('')
	const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
	const [sortByPrice, setSortByPrice] = useState<'asc' | 'desc' | undefined>(undefined)
	const [currentPage, setCurrentPage] = useState(1)
	const debouncedSearch = useDebounceValue(searchValue, 500)
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const { data: products, isPending } = useGetProductsQuery({
		config: {
			params: {
				categoryId: category.id,
				search: debouncedSearch,
				ingredientId: selectedIngredients,
				orderBy: sortByPrice,
				page: currentPage,
				limit: 5
			}
		}
	})
	const totalPages = products?.data?.totalPages || 1

	const toggleIngredient = (ingredientId: string) => {
		setSelectedIngredients(prev => (prev.includes(ingredientId) ? prev.filter(id => id !== ingredientId) : [...prev, ingredientId]))
		setCurrentPage(1)
	}

	const activeFiltersCount = (selectedIngredients.length > 0 ? 1 : 0) + (sortByPrice ? 1 : 0)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	return (
		<div className='px-4 py-8 sm:px-6 lg:px-8'>
			<section className='relative mb-12 rounded-lg shadow-md shadow-primary/30'>
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
				<SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />

				<div className='flex gap-4'>
					<Select
						value={sortByPrice}
						onValueChange={value => {
							setSortByPrice(value as 'asc' | 'desc')
							setCurrentPage(1)
						}}>
						<SelectTrigger className='w-[200px] rounded-xl border-neutral-200 bg-white/50 backdrop-blur-sm transition-colors hover:bg-white/80'>
							<SelectValue placeholder='Сортировка' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='asc'>По возрастанию цены</SelectItem>
							<SelectItem value='desc'>По убыванию цены</SelectItem>
						</SelectContent>
					</Select>

					<Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
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

							<div className='py-8'>
								<Typography tag='h3' className='mb-6 text-xl font-semibold'>
									Фильтры
								</Typography>
								<div className='space-y-8'>
									<div className='grid grid-cols-2 gap-3'>
										<Ingredients
											selectedIngredients={selectedIngredients}
											handleClickIngredients={toggleIngredient}
											categoryId={category.id}
											className='flex-col'
										/>
									</div>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>

			<div className='mb-8 hidden sm:block'>
				<Ingredients selectedIngredients={selectedIngredients} handleClickIngredients={toggleIngredient} categoryId={category.id} />
			</div>

			<div className='mt-8'>
				{isPending ? (
					<ProductListSkeleton />
				) : products?.data && products.data.products.length > 0 ? (
					<>
						<ProductList products={products.data.products} />
						<div className='mt-8'>
							<Pagination>
								<PaginationContent>
									<PaginationItem>
										<PaginationPrevious
											onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
											className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
										/>
									</PaginationItem>
									{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
										<PaginationItem key={page}>
											<PaginationLink onClick={() => handlePageChange(page)} isActive={currentPage === page}>
												{page}
											</PaginationLink>
										</PaginationItem>
									))}
									<PaginationItem>
										<PaginationNext
											onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
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
