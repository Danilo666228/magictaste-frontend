import { useMutation } from '@tanstack/react-query'

import { RemoveDeliveryAddressRequestConfig, removeDeliveryAddress } from '@/shared/api/request'

export const useDeleteDeliveryAddressMutation = (settings?: MutationSettings<RemoveDeliveryAddressRequestConfig, typeof removeDeliveryAddress>) =>
	useMutation({
		mutationKey: ['changeAvatar'],
		mutationFn: ({ config }) => removeDeliveryAddress({ config: { ...settings?.config, ...config } }),
		...settings?.options
	})
