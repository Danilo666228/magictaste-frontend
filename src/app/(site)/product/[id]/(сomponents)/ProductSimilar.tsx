'use client'

import { ProductList } from '@/app/(site)/category/(components)/ProductList'

import { Container, Typography } from '@/components/ui/common'

import { Product } from '@/shared/api/types'

interface ProductSimilarProps {
	similarProducts: Product[] | undefined
}

export function ProductSimilar({ similarProducts }: ProductSimilarProps) {
	if (!similarProducts?.length) return null

	return (
		<div className='my-10 flex flex-col gap-3'>
			<Typography className='text-2xl font-bold'>Похожие продукты</Typography>
			<ProductList products={similarProducts} />
		</div>
	)
}
