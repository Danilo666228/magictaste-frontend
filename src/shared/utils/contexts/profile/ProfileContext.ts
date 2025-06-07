'use client'

import { Account } from '@/shared/api/types'
import { FetchesResponse } from '@siberiacancode/fetches'
import { UseQueryResult } from '@tanstack/react-query'
import { createContext } from 'react'

export interface ProfileContextProps {
	profileQuery: UseQueryResult<FetchesResponse<Account>, Error>
	profile: Account | undefined
	isAuth: boolean
	setIsAuth: (value: boolean) => void
	logout: () => void
}

export const ProfileContext = createContext<ProfileContextProps | null>({} as ProfileContextProps)
