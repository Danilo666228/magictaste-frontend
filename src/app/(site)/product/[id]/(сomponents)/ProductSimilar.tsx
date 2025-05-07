'use client'

import { Container, Typography } from '@/components/ui/common'

import { Product } from '@/shared/api/types'

import { ProductList } from '../../../menu/(components)/ProductList'

interface ProductSimilarProps {
	similarProducts: Product[] | undefined
}

export function ProductSimilar({ similarProducts }: ProductSimilarProps) {
	if (!similarProducts?.length) return null

	return (
		<Container className='my-10 flex flex-col gap-3'>
			<Typography className='text-2xl font-bold'>Похожие продукты</Typography>
			<ProductList take={4} products={similarProducts} />
		</Container>
	)
}
