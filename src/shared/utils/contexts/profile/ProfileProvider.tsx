'use client'

import { ProfileContext, ProfileContextProps } from './ProfileContext'
import { useLogoutMutation } from '@/shared/api/hooks/auth/useLogoutMutation'
import { useGetProfileQuery } from '@/shared/api/hooks/profile/useGetProfileQuery'
import { useClearSessionMutation } from '@/shared/api/hooks/session/useClearSessionMutation'
import { useLocalStorage } from '@/shared/hooks'
import { ROUTE } from '@/shared/utils/constants'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

interface ProfileProviderProps {
	children: ReactNode
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
	const router = useRouter()
	const isAuthStorage = useLocalStorage('isAuth', 'false')

	const profileQuery = useGetProfileQuery({
		options: {
			enabled: Boolean(isAuthStorage.value)
		}
	})
	const clearSessionMutation = useClearSessionMutation()
	const logoutMutation = useLogoutMutation()

	const setIsAuth = (value: boolean) => {
		isAuthStorage.set(value.toString())
	}

	const logout = async () => {
		await logoutMutation.mutateAsync({})
		isAuthStorage.set('false')
		router.push(ROUTE.auth.signIn)
	}

	useEffect(() => {
		if (profileQuery.error) {
			isAuthStorage.set('false')
			clearSessionMutation.mutate({})
			router.push(ROUTE.auth.signIn)
		}
	}, [profileQuery.error])

	const value: ProfileContextProps = {
		profileQuery,
		profile: profileQuery.data?.data,
		isAuth: Boolean(isAuthStorage.value),
		setIsAuth,
		logout
	}

	return <ProfileContext value={value}>{children}</ProfileContext>
}
