import { DropdownMenuItem } from '@/components/ui/common'
import { useDeleteProductMutation } from '@/shared/api/hooks/products/useDeleteProductMutation'
import { useQueryClient } from '@tanstack/react-query'

export function DeleteProductMenuItem({ productId }: { productId: string }) {
	const queryClient = useQueryClient()
	const { mutateAsync: deleteProduct } = useDeleteProductMutation({
		options: {
			onSuccess() {
				queryClient.invalidateQueries({ queryKey: ['getProducts'] })
				queryClient.invalidateQueries({ queryKey: ['getProductsStatistics'] })
			}
		}
	})

	const handleDeleteProduct = () => {
		deleteProduct({ config: { params: { productId } } })
	}

	return <DropdownMenuItem onClick={handleDeleteProduct}>Удалить</DropdownMenuItem>
}
