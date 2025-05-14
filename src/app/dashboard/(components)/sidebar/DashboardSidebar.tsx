'use client'

import { ComponentProps } from 'react'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/common'

import { useProfile } from '@/hooks/useProfile'

import { NavHeader } from './NavHeader'
import { NavUser } from './NavUser'
import { Navigation } from './Navigation/Navigation'

export function DashboardSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
	const { profile, isPending } = useProfile()


	if (!profile?.data) {
		return null
	}

	return (
		<Sidebar className="font-semibold" variant="inset" collapsible="icon" {...props}>
			<SidebarHeader className="mb-2 rounded-lg">
				<NavHeader />
			</SidebarHeader>
			<SidebarContent>
				<Navigation profile={profile?.data} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser profile={profile?.data} isPending={isPending} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
