import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { useGetVerificationQuery } from '@/shared/api/hooks/auth/useGetVerificationQuery'
import { ROUTE } from '@/shared/utils/constants/route'
import { useProfile } from '@/shared/utils/contexts'

export function useVerificationAccount(token: string | null) {
	const router = useRouter()
	const { setIsAuth } = useProfile()

	const { isError, isSuccess, data, isPending } = useGetVerificationQuery({
		config: {
			params: { token }
		},
		options: {
			enabled: !!token
		}
	})

	if (isSuccess) {
		setIsAuth(true)
		toast.success('Аккаунт успешно верифицирован')
		router.push(ROUTE.dashboard.profile)
	}

	if (isError) {
		toast.error('Ошибка верификации аккаунта')
		router.push(ROUTE.auth.signIn)
	}

	return { isError, isSuccess, isPending }
}
