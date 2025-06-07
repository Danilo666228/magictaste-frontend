import { useMutation } from '@tanstack/react-query'

import { clearCart } from '@/shared/api/request'

export const useClearCartMutation = (settings?: MutationSettings<void, typeof clearCart>) =>
	useMutation({
		mutationKey: ['clearCart'],
		mutationFn: () => clearCart({ config: settings?.config }),
		...settings?.options
	})
