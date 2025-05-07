import { useMutation } from '@tanstack/react-query'

import { PostDeliveryAddressRequestConfig, postDeliveryAddress } from '@/shared/api/request'

export const usePostDeliveryAddress = (settings?: MutationSettings<PostDeliveryAddressRequestConfig, typeof postDeliveryAddress>) =>
	useMutation({
		mutationKey: ['postDeliveryAddress'],
		mutationFn: ({ params, config }) => postDeliveryAddress({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
