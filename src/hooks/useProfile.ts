'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useLogoutMutation } from '@/shared/api/hooks/auth/useLogoutMutation'
import { useGetProfileQuery } from '@/shared/api/hooks/profile/useGetProfileQuery'
import { useClearSessionMutation } from '@/shared/api/hooks/session/useClearSessionMutation'
import { useLocalStorage } from '@/shared/hooks'
import { ROUTE } from '@/shared/utils/constants/route'

export function useProfile() {
	const { set, value } = useLocalStorage('isAuth', localStorage.getItem('isAuth') || 'false')

	const router = useRouter()

	const setIsAuth = (value: boolean) => {
		set(value.toString())
	}

	const {
		isError,
		data: profile,
		isPending,
		isSuccess,
		refetch
	} = useGetProfileQuery({
		options: {
			enabled: Boolean(value)
		}
	})
	const { mutateAsync: logout } = useLogoutMutation()
	const { mutate: clearSession } = useClearSessionMutation()
	const handleLogout = async () => {
		await logout({})
		set('false')
		router.push(ROUTE.auth.signIn)
	}

	useEffect(() => {
		if (isSuccess) {
			set('true')
		}
	}, [isSuccess])

	useEffect(() => {
		if (isError) {
			clearSession({})
			// unauthorized()
			set('false')
			router.push(ROUTE.auth.signIn)
		}
	}, [isError])

	return {
		profile,
		isPending,
		refetch,
		isAuth: Boolean(value),
		setIsAuth,
		logout: handleLogout
	}
}
