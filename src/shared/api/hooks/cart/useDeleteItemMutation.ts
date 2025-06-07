import { useMutation } from '@tanstack/react-query'

import { DeleteItemRequestConfig, deleteItem } from '@/shared/api/request'

export const useDeleteItemMutation = (settings?: MutationSettings<DeleteItemRequestConfig, typeof deleteItem>) =>
	useMutation({
		mutationKey: ['deleteItemFromCart'],
		mutationFn: ({ config }) => deleteItem({ config: { ...settings?.config, ...config } }),
		...settings?.options
	})
