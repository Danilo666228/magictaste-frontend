import { useMutation } from '@tanstack/react-query'

import { CreateCategoryRequestConfig } from '../../request'
import { createCategory } from '../../request/category'

export const useCreateCategoryMutation = (settings?: MutationSettings<CreateCategoryRequestConfig, typeof createCategory>) =>
	useMutation({
		mutationKey: ['createCategory'],
		mutationFn: ({ params, config }) => createCategory({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
