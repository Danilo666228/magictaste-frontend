import { useMutation } from '@tanstack/react-query'

import { CreateProductRequestConfig, createProduct } from '../../request'

export const useCreateProductMutation = (settings?: MutationSettings<CreateProductRequestConfig, typeof createProduct>) =>
	useMutation({
		mutationKey: ['createProduct'],
		mutationFn: ({ params, config }) => createProduct({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
