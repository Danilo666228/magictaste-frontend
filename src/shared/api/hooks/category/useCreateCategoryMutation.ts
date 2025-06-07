import { CreateCategoryRequestConfig } from '../../request'
import { createCategory } from '../../request/category'
import { useMutation } from '@tanstack/react-query'

export const useCreateCategoryMutation = (settings?: MutationSettings<CreateCategoryRequestConfig, typeof createCategory>) =>
	useMutation({
		mutationKey: ['createCategory'],
		mutationFn: ({ params, config }) => createCategory({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
