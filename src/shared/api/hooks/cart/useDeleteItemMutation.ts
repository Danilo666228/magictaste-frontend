import { DeleteItemRequestConfig, deleteItem } from '@/shared/api/request'
import { useMutation } from '@tanstack/react-query'

export const useDeleteItemMutation = (settings?: MutationSettings<DeleteItemRequestConfig, typeof deleteItem>) =>
	useMutation({
		mutationKey: ['deleteItemFromCart'],
		mutationFn: ({ config }) => deleteItem({ config: { ...settings?.config, ...config } }),
		...settings?.options
	})
