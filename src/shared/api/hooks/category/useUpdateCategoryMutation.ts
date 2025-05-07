import { useMutation } from '@tanstack/react-query'

import { UpdateCategoryRequestConfig, updateCategory } from '../../request/category/update'

export const useUpdateCategoryMutation = (settings?: MutationSettings<UpdateCategoryRequestConfig, typeof updateCategory>) =>
	useMutation({
		mutationKey: ['updateCategory'],
		mutationFn: ({ params, config }: UpdateCategoryRequestConfig) =>
			updateCategory({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
