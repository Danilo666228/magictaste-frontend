import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { useGetProfileQuery } from '@/shared/api/hooks/profile/useGetProfileQuery'
import { useClearSessionMutation } from '@/shared/api/hooks/session/useClearSessionMutation'

import { ROUTE } from '@/config/route.config'

export function useProfile() {
	const { isAuth, unauthorized } = useAuth()

	const router = useRouter()
	const {
		isError,
		data: profile,
		isPending,
		refetch
	} = useGetProfileQuery({
		options: {
			enabled: isAuth
		}
	})
	const { mutate: clearSession } = useClearSessionMutation()

	useEffect(() => {
		if (isError) {
			clearSession({})
			unauthorized()
			router.push(ROUTE.auth.signIn)
		}
	}, [isError])

	return {
		profile,
		isPending,
		refetch
	}
}
