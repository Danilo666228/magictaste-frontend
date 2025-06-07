import { ChangeCategoryImageRequestConfig, changeCategoryImage } from '@/shared/api/request'
import { useMutation } from '@tanstack/react-query'

export const useChangeCategoryImageMutation = (settings?: MutationSettings<ChangeCategoryImageRequestConfig, typeof changeCategoryImage>) =>
	useMutation({
		mutationKey: ['changeCategoryImage'],
		mutationFn: ({ params, config }) => changeCategoryImage({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
