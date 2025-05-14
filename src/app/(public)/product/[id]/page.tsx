import { notFound } from 'next/navigation'

import { API_URL } from '@/lib/constants/url.constants'

import { Product } from '@/shared/api/types'

import { ProductAbout } from './(сomponents)/ProductAbout/ProductAbout'
import { ProductInfo } from './(сomponents)/ProductInfo'
import { ProductSimilar } from './(сomponents)/ProductSimilar'

async function getProduct(id: string) {
	try {
		const response = await fetch(API_URL + `/products/${id}`)

		if (!response.ok) {
			return notFound()
		}
		return (await response.json()) as Product
	} catch (error) {
		console.error('Error fetching product:', error)
		return notFound()
	}
}

async function getSimilarProducts(categoryId: string, productId: string) {
	try {
		const response = await fetch(API_URL + `/products/similar?categoryId=${categoryId}&productId=${productId}`)

		if (!response.ok) {
			return []
		}
		return (await response.json()) as Product[]
	} catch (error) {
		console.error('Error fetching similar products:', error)
		return []
	}
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const product = await getProduct(id)

	if (!product) {
		return notFound()
	}

	const similarProducts = await getSimilarProducts(product.category.id, product.id)

	return (
		<div className='container mx-auto px-4 py-8'>
			<ProductInfo product={product} />
			<ProductAbout product={product} />
			<ProductSimilar similarProducts={similarProducts} />
		</div>
	)
}
