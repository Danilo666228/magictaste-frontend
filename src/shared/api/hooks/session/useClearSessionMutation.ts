import { useMutation } from '@tanstack/react-query'

import { ClearSessionConfig, clearSession } from '@/shared/api/request'

export const useClearSessionMutation = (settings?: MutationSettings<ClearSessionConfig, typeof clearSession>) =>
	useMutation({
		mutationKey: ['clear-session'],
		mutationFn: ({ config }) => clearSession({ config: { ...settings?.config, ...config } }),
		...settings?.options
	})
