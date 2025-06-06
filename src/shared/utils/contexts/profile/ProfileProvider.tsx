'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

import { useLogoutMutation } from '@/shared/api/hooks/auth/useLogoutMutation'
import { useGetProfileQuery } from '@/shared/api/hooks/profile/useGetProfileQuery'
import { useClearSessionMutation } from '@/shared/api/hooks/session/useClearSessionMutation'
import { useLocalStorage } from '@/shared/hooks'
import { ROUTE } from '@/shared/utils/constants'

import { ProfileContext, ProfileContextProps } from './ProfileContext'

interface ProfileProviderProps {
	children: ReactNode
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
	const router = useRouter()
	const isAuthStorage = useLocalStorage('isAuth', localStorage.getItem('isAuth') || 'false')
	const profileQuery = useGetProfileQuery()
	const clearSessionMutation = useClearSessionMutation()
	const logoutMutation = useLogoutMutation()

	const setIsAuth = (value: boolean) => {
		isAuthStorage.set(value ? 'true' : 'false')
	}

	const logout = () => {
		logoutMutation.mutate({})
		isAuthStorage.set('false')
		router.push(ROUTE.auth.signIn)
	}

	useEffect(() => {
		isAuthStorage.set('true')
		if (profileQuery.error) {
			isAuthStorage.set('false')
			clearSessionMutation.mutate({})
			router.push(ROUTE.auth.signIn)
		}
	}, [profileQuery.error])

	const value: ProfileContextProps = {
		profile: profileQuery.data?.data,
		isPending: profileQuery.isPending,
		isAuth: Boolean(isAuthStorage.value),
		setIsAuth,
		logout
	}

	return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}
