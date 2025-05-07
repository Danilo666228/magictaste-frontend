import { notFound } from 'next/navigation'

import { Product } from '@/shared/api/types'

import { ProductModal } from './components/ProductModal'
import { API_URL } from '@/lib/constants/url.constants'

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
export default async function ProductModalPage({ params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id
	const product = await getProduct(id)
	return <ProductModal product={product} />
}
