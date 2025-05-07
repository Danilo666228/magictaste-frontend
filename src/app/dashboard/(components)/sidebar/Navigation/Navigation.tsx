'use client'

import { usePathname } from 'next/navigation'

import { SidebarGroup, SidebarGroupLabel, SidebarMenu } from '@/components/ui/common'

import { navigationConfig } from '../navigation.config'

import { NavigationItem } from './NavigationItem'
import { NavigationProps } from './types'
import { filterItemsByRole, getGroupLabel, groupNavigationItems } from './utils'

export function Navigation({ profile }: NavigationProps) {
	const pathname = usePathname()
	const userRoles = profile?.roles.map(role => role.name) || []

	const filteredItems = filterItemsByRole(navigationConfig, userRoles)
	const groupedItems = groupNavigationItems(filteredItems)

	return (
		<>
			{Object.entries(groupedItems).map(([group, items]) => (
				<SidebarGroup className='rounded-lg' key={group}>
					<SidebarGroupLabel className=''>{getGroupLabel(group as any)}</SidebarGroupLabel>

					<SidebarMenu>
						{items.map(item => (
							<NavigationItem key={item.title} item={item} pathname={pathname} />
						))}
					</SidebarMenu>
				</SidebarGroup>
			))}
		</>
	)
}
