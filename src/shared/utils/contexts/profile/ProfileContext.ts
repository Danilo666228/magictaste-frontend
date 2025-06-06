'use client'

import { createContext } from 'react'

import { Account } from '@/shared/api/types'

export interface ProfileContextProps {
	profile: Account | undefined
	isPending: boolean
	isAuth: boolean
	setIsAuth: (value: boolean) => void
	logout: () => void
}

export const ProfileContext = createContext<ProfileContextProps | null>({} as ProfileContextProps)
