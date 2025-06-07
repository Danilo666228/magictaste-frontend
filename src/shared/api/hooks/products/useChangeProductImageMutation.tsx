import { ChangeProductImageRequestConfig, changeProductImage } from '@/shared/api/request'
import { useMutation } from '@tanstack/react-query'

export const useChangeProductImageMutation = (settings?: MutationSettings<ChangeProductImageRequestConfig, typeof changeProductImage>) =>
	useMutation({
		mutationKey: ['changeProductImage'],
		mutationFn: ({ params, config }) => changeProductImage({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
