import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { ReactNode } from 'react'

import { ScrollArea, Separator, SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/common'

import { NO_INDEX_PAGE } from '@/lib/constants/seo.constants'

import { DashboardSidebar } from './(components)/sidebar/DashboardSidebar'

export const metadata: Metadata = {
	...NO_INDEX_PAGE
}

export default async function DashboardLayout({ children }: { children: ReactNode }) {
	const cookieStore = await cookies()
	const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<DashboardSidebar />
			<SidebarInset className='h-[calc(100vh-20px)]'>
				<header className='flex h-[64px] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
					<div className='flex items-center gap-2 px-4'>
						<SidebarTrigger />
						<Separator orientation='vertical' className='mr-2 h-4' />
					</div>
				</header>
				<Separator />
				<ScrollArea className='flex-1'>
					<main className='px-[70px] py-5'>{children}</main>
				</ScrollArea>
			</SidebarInset>
		</SidebarProvider>
	)
}
