'use client'

import { ChefHat, Utensils } from 'lucide-react'

import { Skeleton, Typography } from '@/components/ui/common'

import { useGetCategoryQuery } from '@/shared/api/hooks/category/useGetCategoryQuery'

import { ProductListSkeleton } from '../ProductList'

import { CategoryItem } from './CategoryItem'

export function CategoryList() {
	const { data: categories, isPending } = useGetCategoryQuery()
	const categoryHasProducts = categories?.data.categories.filter(category => category.products && category.products.length > 0)

	if (isPending) {
		return <CategoryListSkeleton />
	}

	if (!categoryHasProducts?.length) {
		return (
			<div className='relative py-24 text-center'>
				<div className='relative mx-auto max-w-md'>
					<div className='mb-8 flex justify-center'>
						<div className='relative'>
							<div className='flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg backdrop-blur-sm'>
								<Utensils className='h-12 w-12 text-primary' />
							</div>

							<div className='absolute -right-2 -top-2 flex h-8 w-8 animate-bounce items-center justify-center rounded-full bg-primary/20'>
								<ChefHat className='h-4 w-4 text-primary' />
							</div>
						</div>
					</div>

					<div className='space-y-4'>
						<Typography tag='h3' className='text-2xl font-bold'>
							<span className='bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>Меню обновляется</span>
						</Typography>
						<Typography tag='p' className='leading-relaxed text-muted-foreground'>
							Наши повара готовят что-то особенное для вас. Совсем скоро здесь появятся новые категории блюд!
						</Typography>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='relative'>
			<div className='absolute inset-0 -z-10 overflow-hidden'>
				<div className='bg-primary/3 absolute left-10 top-20 h-40 w-40 rounded-full blur-3xl'></div>
				<div className='bg-primary/4 absolute right-20 top-1/3 h-32 w-32 rounded-full blur-2xl'></div>
				<div className='bg-primary/2 absolute bottom-40 left-1/3 h-24 w-24 rounded-full blur-xl'></div>
			</div>

			<div className='space-y-16'>
				{categoryHasProducts.map((category, index) => (
					<div key={category.id}>
						<CategoryItem category={category} />
					</div>
				))}
			</div>
		</div>
	)
}

function CategoryListSkeleton() {
	return (
		<div className='relative'>
			{/* Декоративные элементы для skeleton */}
			<div className='absolute inset-0 -z-10 overflow-hidden'>
				<div className='absolute left-10 top-20 h-40 w-40 animate-pulse rounded-full bg-muted/20 blur-3xl'></div>
				<div className='absolute right-20 top-1/3 h-32 w-32 animate-pulse rounded-full bg-muted/15 blur-2xl'></div>
			</div>

			<div className='space-y-20'>
				{[1, 2].map(index => (
					<div key={index} className='relative'>
						{/* Category header skeleton */}
						<div className='mb-12 rounded-2xl bg-background/40 p-6 backdrop-blur-sm'>
							<div className='mb-6'>
								<Skeleton className='h-8 w-32 rounded-full' />
							</div>
							<div className='flex items-center justify-between'>
								<div className='space-y-3'>
									<Skeleton className='h-10 w-64' />
									<div className='flex items-center gap-4'>
										<Skeleton className='h-5 w-24' />
										<Skeleton className='h-1 w-12 rounded-full' />
									</div>
								</div>
								<Skeleton className='h-12 w-32 rounded-lg' />
							</div>
						</div>

						{/* Products skeleton */}
						<ProductListSkeleton />
					</div>
				))}
			</div>
		</div>
	)
}
