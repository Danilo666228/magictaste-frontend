import { useMutation } from '@tanstack/react-query'

import { UpdateProductRequestConfig, updateProduct } from '../../request/product/update'

export const useUpdateProductMutation = (settings?: MutationSettings<UpdateProductRequestConfig, typeof updateProduct>) =>
	useMutation({
		mutationKey: ['updateProduct'],
		mutationFn: ({ params, config }: UpdateProductRequestConfig) => updateProduct({ params, config }),
		...settings?.options
	})
