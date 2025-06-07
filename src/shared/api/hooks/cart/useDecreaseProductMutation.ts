import { DecreaseProductRequestConfig, decreaseProduct } from '@/shared/api/request'
import { useMutation } from '@tanstack/react-query'

export const useDecreaseProductMutation = (settings?: MutationSettings<DecreaseProductRequestConfig, typeof decreaseProduct>) =>
	useMutation({
		mutationKey: ['decreaseProductInCart'],
		mutationFn: ({ params, config }) => decreaseProduct({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
