import { useQueryClient } from '@tanstack/react-query'

import { DropdownMenuItem } from '@/components/ui/common'

import { useChangeProductStatusMutation } from '@/shared/api/hooks/products/useChangeProductStatusMutation'

interface ChangeStatusSaleProps {
	onSale: boolean
	productId: string
}

export function ChangeStatusSale({ onSale, productId }: ChangeStatusSaleProps) {
	const queryClient = useQueryClient()
	const { mutateAsync: changeProductStatus, isPending } = useChangeProductStatusMutation({
		options: {
			onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getProducts'] })
		}
	})

	return (
		<DropdownMenuItem
			onClick={() =>
				changeProductStatus({
					config: {
						params: { productId }
					}
				})
			}>
			{onSale ? 'Снять с продажи' : 'В продажу'}
		</DropdownMenuItem>
	)
}
