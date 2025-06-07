import { ChangeProductStatusRequestConfig, changeProductStatus } from '../../request'
import { useMutation } from '@tanstack/react-query'

export const useChangeProductStatusMutation = (settings?: MutationSettings<ChangeProductStatusRequestConfig, typeof changeProductStatus>) =>
	useMutation({
		mutationKey: ['changeProductStatus'],
		mutationFn: ({ config }) => changeProductStatus({ config: config }),
		...settings?.options
	})
