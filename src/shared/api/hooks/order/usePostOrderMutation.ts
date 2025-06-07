import { CreateOrderConfig, createOrder } from '@/shared/api/request'
import { useMutation } from '@tanstack/react-query'

export const usePostOrderMutation = (settings?: MutationSettings<CreateOrderConfig, typeof createOrder>) =>
	useMutation({
		mutationKey: ['createOrder'],
		mutationFn: ({ params, config }) => createOrder({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
