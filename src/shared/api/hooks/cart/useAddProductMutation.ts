import { AddProductRequestConfig, addProduct } from '@/shared/api/request'
import { useMutation } from '@tanstack/react-query'

export const useAddProductMutation = (settings?: MutationSettings<AddProductRequestConfig, typeof addProduct>) =>
	useMutation({
		mutationKey: ['addProductInCart'],
		mutationFn: ({ params, config }) => addProduct({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
