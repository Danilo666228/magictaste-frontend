import { LucideIcon } from 'lucide-react'

import { RoleName } from '@/shared/api/types'

export interface NavigationItem {
	title: string
	url?: string
	icon?: LucideIcon
	isActive?: boolean
	items?: NavigationSubItem[]
	roles?: RoleName[]
}

interface NavigationSubItem {
	title: string
	url?: string
	icon?: LucideIcon
	roles?: RoleName[]
}

export interface NavigationItemProps {
	item: NavigationItem
	pathname: string
}

export type NavigationGroup = 'main' | 'admin' | 'support'
