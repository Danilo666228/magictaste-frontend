'use client'

import { ComponentProps } from 'react'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/common'

import { NavHeader } from './NavHeader'
import { NavUser } from './NavUser'
import { Navigation } from './Navigation/Navigation'

export function DashboardSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar className='font-semibold' variant='inset' collapsible='icon' {...props}>
			<SidebarHeader className='mb-2 rounded-lg'>
				<NavHeader />
			</SidebarHeader>
			<SidebarContent>
				<Navigation />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
