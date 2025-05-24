import { API_URL } from '@/lib/constants/url.constants'

import { Product } from '@/shared/api/types'

import { ProductModal } from './components/ProductModal'

async function getProduct(id: string) {
	try {
		const response = await fetch(API_URL + `/products/${id}`)

		return (await response.json()) as Product
	} catch (error) {
		console.error('Error fetching product:', error)
	}
}
export default async function ProductModalPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const product = await getProduct(id)
	return <ProductModal product={product as Product} />
}
