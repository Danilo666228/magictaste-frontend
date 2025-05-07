import { removeDeliveryAddress, RemoveDeliveryAddressRequestConfig } from '@/shared/api/request'
import { useMutation } from '@tanstack/react-query'


export const useDeleteDeliveryAddressMutation = (settings?: MutationSettings<RemoveDeliveryAddressRequestConfig, typeof removeDeliveryAddress>) => useMutation({
	mutationKey: ['changeAvatar'],
	mutationFn: ({config}) => removeDeliveryAddress({ config: { ...settings?.config, ...config} }),
	...settings?.options
})