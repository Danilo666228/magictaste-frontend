import { CreateProductRequestConfig, createProduct } from '../../request'
import { useMutation } from '@tanstack/react-query'

export const useCreateProductMutation = (settings?: MutationSettings<CreateProductRequestConfig, typeof createProduct>) =>
	useMutation({
		mutationKey: ['createProduct'],
		mutationFn: ({ params, config }) => createProduct({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
