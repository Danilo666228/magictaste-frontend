import { useMutation } from '@tanstack/react-query'

import { CreateOrderConfig, createOrder } from '@/shared/api/request'

export const usePostOrderMutation = (settings?: MutationSettings<CreateOrderConfig, typeof createOrder>) =>
	useMutation({
		mutationKey: ['createOrder'],
		mutationFn: ({ params, config }) => createOrder({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
