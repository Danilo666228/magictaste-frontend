import { createContext, useContext } from 'react'

import { Product } from '@/shared/api/types/product'

interface ProductCardContextValue {
	product: Product
}

const ProductCardContext = createContext<ProductCardContextValue | null>(null)

export const useProductCard = () => {
	const context = useContext(ProductCardContext)
	if (!context) {
		throw new Error('ProductCardContext not found')
	}
	return context
}

export const ProductCardProvider = ({ children, product }: { children: React.ReactNode; product: Product }) => {
	return <ProductCardContext.Provider value={{ product }}>{children}</ProductCardContext.Provider>
}
