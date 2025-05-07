import { useMutation } from '@tanstack/react-query'

import { DeleteSessionConfig, deleteSession } from '../../request/session/delete'

export const useDeleteSessionMutation = (settings?: MutationSettings<DeleteSessionConfig, typeof deleteSession>) =>
	useMutation({
		mutationKey: ['deleteSession'],
		mutationFn: ({ config }) => deleteSession({ config: { ...settings?.options, ...config } }),
		...settings?.options
	})
