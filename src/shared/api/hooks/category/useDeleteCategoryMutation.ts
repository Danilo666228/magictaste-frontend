import { useMutation } from '@tanstack/react-query'

import { DeleteCategoryRequestConfig, deleteCategory } from '../../request/category/delete'

export const useDeleteCategoryMutation = (settings?: MutationSettings<DeleteCategoryRequestConfig, typeof deleteCategory>) =>
	useMutation({
		mutationKey: ['deleteCategory'],
		mutationFn: ({ config }: DeleteCategoryRequestConfig) => deleteCategory({ config: { ...settings?.config, ...config } }),
		...settings?.options
	})
