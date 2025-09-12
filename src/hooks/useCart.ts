import { useQueryClient } from '@tanstack/react-query'

import { useAddProductMutation } from '@/shared/api/hooks/cart/useAddProductMutation'
import { useClearCartMutation } from '@/shared/api/hooks/cart/useClearCartMutation'
import { useDecreaseProductMutation } from '@/shared/api/hooks/cart/useDecreaseProductMutation'
import { useDeleteItemMutation } from '@/shared/api/hooks/cart/useDeleteItemMutation'
import { useGetCartQuery } from '@/shared/api/hooks/cart/useGetCartQuery'
import { useProfile } from '@/shared/utils/contexts'

export function useCart() {
	const { isAuth } = useProfile()
	const queryClient = useQueryClient()
	const getCartQuery = useGetCartQuery({
		options: {
			enabled: isAuth
		}
	})

	const addProductMutation = useAddProductMutation({
		options: {
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['getCart'] })
			}
		}
	})
	const decreaseProductMutation = useDecreaseProductMutation({
		options: {
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['getCart'] })
			}
		}
	})

	const deleteItemMutation = useDeleteItemMutation({
		options: {
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['getCart'] })
			}
		}
	})

	const clearCartMutation = useClearCartMutation({
		options: {
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['getCart'] })
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
