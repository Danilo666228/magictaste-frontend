import { RoleName } from '@/shared/api/types'

import { NavigationGroup, NavigationItem } from './types'
import { checkAccessRoles } from '@/lib/utils/accessRoles'

export const getNavigationGroup = (item: NavigationItem): NavigationGroup => {
	if (item.roles?.includes(RoleName.SUPPORT)) return 'support'
	if (item.roles?.some(role => role === RoleName.ADMIN || role === RoleName.SUPER_ADMIN)) return 'admin'
	return 'main'
}

export const filterItemsByRole = (items: NavigationItem[], userRoles: RoleName[]) => {
	return items.filter(item => !item.roles || checkAccessRoles(userRoles, item.roles))
}

export const groupNavigationItems = (items: NavigationItem[]) => {
	return items.reduce(
		(acc, item) => {
			const group = getNavigationGroup(item)
			if (!acc[group]) {
				acc[group] = []
			}
			acc[group].push(item)
			return acc
		},
		{} as Record<NavigationGroup, NavigationItem[]>
	)
}

export const getGroupLabel = (group: NavigationGroup): string => {
	switch (group) {
		case 'main':
			return 'Личный кабинет'
		case 'admin':
			return 'Управление магазином'
		case 'support':
			return 'Техническая поддержка'
		default:
			return ''
	}
}
