'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, useCallback, useEffect, useMemo } from 'react'

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
	const isAuthStorage = useLocalStorage('isAuth', 'false')
	const router = useRouter()

	const profileQuery = useGetProfileQuery({
		options: {
			enabled: Boolean(isAuthStorage.value),
			retry: false,
			refetchOnWindowFocus: false
		}
	})

	const clearSessionMutation = useClearSessionMutation()
	const logoutMutation = useLogoutMutation()

	const setIsAuth = useCallback(
		(value: boolean) => {
			isAuthStorage.set(value.toString())
		},
		[isAuthStorage]
	)

	const logout = useCallback(async () => {
		try {
			await logoutMutation.mutateAsync({})
		} catch (error) {
			console.error('Ошибка при выходе:', error)
		} finally {
			isAuthStorage.set('false')
			router.push(ROUTE.auth.signIn)
		}
	}, [logoutMutation, isAuthStorage, router])

	useEffect(() => {
		if (profileQuery.error) {
			console.warn('Ошибка получения профиля:', profileQuery.error)
			isAuthStorage.set('false')
			clearSessionMutation.mutate({})
			router.push(ROUTE.auth.signIn)
		}
	}, [profileQuery.error, isAuthStorage, clearSessionMutation, router])

	const contextValue = useMemo<ProfileContextProps>(
		() => ({
			profileQuery,
			profile: profileQuery.data?.data,
			isAuth: Boolean(isAuthStorage.value),
			setIsAuth,
			logout
		}),
		[profileQuery, isAuthStorage.value, setIsAuth, logout]
	)

	return <ProfileContext value={contextValue}>{children}</ProfileContext>
}
