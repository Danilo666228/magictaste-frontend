'use client'

import { Utensils } from 'lucide-react'

import { Skeleton, Typography } from '@/components/ui/common'

import { useGetCategoryQuery } from '@/shared/api/hooks/category/useGetCategoryQuery'

import { ProductListSkeleton } from '../ProductList'

import { CategoryItem } from './CategoryItem'

export function CategoryList() {
	const { data: categories, isPending } = useGetCategoryQuery()
	const categoryHasProducts = categories?.data.filter(category => category.products && category.products.length > 0)

	if (isPending) {
		return <CategoryListSkeleton />
	}

	if (!categoryHasProducts?.length) {
		return (
			<div className='py-16 text-center'>
				<div className='mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted'>
					<Utensils className='h-8 w-8 text-muted-foreground' />
				</div>
				<Typography tag='h3' className='mb-2 text-xl font-medium text-foreground'>
					Категории не найдены
				</Typography>
				<Typography tag='p' className='mx-auto max-w-md text-muted-foreground'>
					В данный момент меню обновляется. Пожалуйста, загляните позже.
				</Typography>
			</div>
		)
	}

	return (
		<div>
			{categoryHasProducts.map(category => (
				<CategoryItem key={category.id} category={category} />
			))}
		</div>
	)
}

function CategoryListSkeleton() {
	return (
		<div>
			{[1, 2].map(index => (
				<div key={index} className='mb-16'>
					<div className='mb-8 border-b border-gray-100 pb-4'>
						<div className='flex items-center justify-between'>
							<div>
								<Skeleton className='mb-2 h-8 w-48' />
								<Skeleton className='h-4 w-24' />
							</div>
							<Skeleton className='h-10 w-32' />
						</div>
					</div>
					<ProductListSkeleton />
				</div>
			))}
		</div>
	)
}
