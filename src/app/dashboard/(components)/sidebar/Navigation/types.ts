import { LucideIcon } from 'lucide-react'

import { RoleName } from '@/shared/api/types'

export interface NavigationItem {
	title: string
	url?: string
	icon?: LucideIcon
	isActive?: boolean
	items?: NavigationSubItem[]
	roles?: RoleName[]
	isBeta?: boolean
}

interface NavigationSubItem {
	title: string
	url?: string
	icon?: LucideIcon
	roles?: RoleName[]
	isBeta?: boolean
}

export interface NavigationItemProps {
	item: NavigationItem
	pathname: string
}

export type NavigationGroup = 'main' | 'admin' | 'support'
