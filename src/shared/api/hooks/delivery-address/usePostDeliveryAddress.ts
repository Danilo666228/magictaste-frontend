import type { PostDeliveryAddressRequestConfig } from '@/shared/api/request'
import { postDeliveryAddress } from '@/shared/api/request'
import { useMutation } from '@tanstack/react-query'

export const usePostDeliveryAddress = (settings?: MutationSettings<PostDeliveryAddressRequestConfig, typeof postDeliveryAddress>) =>
	useMutation({
		mutationKey: ['postDeliveryAddress'],
		mutationFn: ({ params, config }) => postDeliveryAddress({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
