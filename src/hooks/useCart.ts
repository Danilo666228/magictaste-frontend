import { useAuth } from '@/hooks/useAuth'

import { useAddProductMutation } from '@/shared/api/hooks/cart/useAddProductMutation'
import { useClearCartMutation } from '@/shared/api/hooks/cart/useClearCartMutation'
import { useDecreaseProductMutation } from '@/shared/api/hooks/cart/useDecreaseProductMutation'
import { useDeleteItemMutation } from '@/shared/api/hooks/cart/useDeleteItemMutation'
import { useGetCartQuery } from '@/shared/api/hooks/cart/useGetCartQuery'

export function useCart() {
	const { isAuth } = useAuth()
	const getCartQuery = useGetCartQuery({
		options: {
			enabled: !!isAuth
		}
	})

	const addProductMutation = useAddProductMutation({
		options: {
			onSuccess: () => {
				getCartQuery.refetch()
			}
		}
	})
	const decreaseProductMutation = useDecreaseProductMutation({
		options: {
			onSuccess: () => {
				getCartQuery.refetch()
			}
		}
	})

	const deleteItemMutation = useDeleteItemMutation({
		options: {
			onSuccess: () => {
				getCartQuery.refetch()
			}
		}
	})

	const clearCartMutation = useClearCartMutation({
		options: {
			onSuccess: () => {
				getCartQuery.refetch()
			}
		}
	})

	const handleClearCart = () => {
		clearCartMutation.mutate()
	}

	const handleAddProduct = (id: string, quantity?: number) => {
		addProductMutation.mutate({
			params: {
				productId: id,
				quantity
			}
		})
	}

	const handleDecreaseItem = (id: string) => {
		decreaseProductMutation.mutate({
			params: {
				productId: id
			}
		})
	}

	const handleDeleteItem = (id: string) => {
		deleteItemMutation.mutate({
			config: {
				params: { productId: id }
			}
		})
	}

	return {
		cart: getCartQuery.data,
		handleAddProduct,
		handleDecreaseItem,
		handleDeleteItem,
		handleClearCart
	}
}
