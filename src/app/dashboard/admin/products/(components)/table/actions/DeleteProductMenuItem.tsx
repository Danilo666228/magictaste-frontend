import { useQueryClient } from '@tanstack/react-query'

import { DropdownMenuItem } from '@/components/ui/common'

import { useDeleteProductMutation } from '@/shared/api/hooks/products/useDeleteProductMutation'

export function DeleteProductMenuItem({ productId }: { productId: string }) {
	const queryClient = useQueryClient()
	const { mutateAsync: deleteProduct } = useDeleteProductMutation({
		options: {
			onSuccess() {
				queryClient.refetchQueries({ queryKey: ['getProducts'] })
			}
		}
	})

	const handleDeleteProduct = () => {
		deleteProduct({ config: { params: { productId } } })
	}

	return <DropdownMenuItem onClick={handleDeleteProduct}>Удалить</DropdownMenuItem>
}
