import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { useAuth } from '@/hooks/useAuth'

import { useGetVerificationQuery } from '@/shared/api/hooks/auth/useGetVerificationQuery'

import { ROUTE } from '@/config/route.config'

export function useVerificationAccount(token: string | null) {
	const router = useRouter()
	const { authorized } = useAuth()

	const { isError, isSuccess, data, isPending } = useGetVerificationQuery({
		config: {
			params: { token }
		},
		options: {
			enabled: !!token
		}
	})

	if (isSuccess) {
		authorized()
		toast.success('Аккаунт успешно верифицирован')
		router.push(ROUTE.dashboard.profile)
	}

	if (isError) {
		toast.error('Ошибка верификации аккаунта')
		router.push(ROUTE.auth.signIn)
	}

	return { isError, isSuccess, isPending }
}
