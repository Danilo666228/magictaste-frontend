import { UpdateCategoryRequestConfig, updateCategory } from '../../request/category/update'
import { useMutation } from '@tanstack/react-query'

export const useUpdateCategoryMutation = (settings?: MutationSettings<UpdateCategoryRequestConfig, typeof updateCategory>) =>
	useMutation({
		mutationKey: ['updateCategory'],
		mutationFn: ({ params, config }: UpdateCategoryRequestConfig) => updateCategory({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
