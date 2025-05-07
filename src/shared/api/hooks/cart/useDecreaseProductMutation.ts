import { useMutation } from '@tanstack/react-query'

import { DecreaseProductRequestConfig, decreaseProduct } from '@/shared/api/request'

export const useDecreaseProductMutation = (settings?: MutationSettings<DecreaseProductRequestConfig, typeof decreaseProduct>) =>
	useMutation({
		mutationKey: ['decreaseProductInCart'],
		mutationFn: ({ params, config }) => decreaseProduct({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
