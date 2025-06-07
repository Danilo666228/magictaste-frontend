import { DeleteProductRequestConfig, deleteProduct } from '@/shared/api/request'
import { useMutation } from '@tanstack/react-query'

export const useDeleteProductMutation = (settings?: MutationSettings<DeleteProductRequestConfig, typeof deleteProduct>) =>
	useMutation({
		mutationKey: ['deleteProduct'],
		mutationFn: ({ config }) => deleteProduct({ config }),

		...settings?.options
	})
