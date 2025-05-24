'use client'

import { ChevronsUpDown, GalleryVerticalEnd } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { DropdownMenu, DropdownMenuTrigger, SidebarMenu, SidebarMenuButton, SidebarMenuItem, Typography } from '@/components/ui/common'

import { ROUTE } from '@/config/route.config'

export function NavHeader() {
	const router = useRouter()

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							onClick={() => router.push(ROUTE.dashboard.profile)}
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
							<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar'>
								<GalleryVerticalEnd size={18} className='' />
							</div>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<Typography className='font-semibold'>MagicTaste</Typography>
							</div>
							<ChevronsUpDown className='ml-auto' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
