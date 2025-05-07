'use client'

import { Bell, ChevronsUpDown, LogOut } from 'lucide-react'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	Skeleton,
	useSidebar
} from '@/components/ui/common'

import { useAuth } from '@/hooks/useAuth'

import { Account } from '@/shared/api/types/account'

import { getMediaSource } from '@/lib/utils'

interface NavUserProps {
	profile: Account | undefined
	isPending: boolean
}

export function NavUser({ profile, isPending }: NavUserProps) {
	const { isMobile } = useSidebar()
	const { handleLogout } = useAuth()

	if (isPending) return <NavUserSkeleton />

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
							<Avatar className='h-8 w-8 rounded-lg'>
								<AvatarImage src={getMediaSource(profile?.picture)} alt={profile?.userName} />
								<AvatarFallback className='rounded-lg'>{profile?.userName?.slice(0, 2)?.toUpperCase()}</AvatarFallback>
							</Avatar>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-semibold'>{profile?.userName}</span>
								<span className='truncate text-xs'>{profile?.email}</span>
							</div>
							<ChevronsUpDown className='ml-auto size-4' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
						side={isMobile ? 'bottom' : 'right'}
						align='end'
						sideOffset={4}>
						<DropdownMenuLabel className='p-0 font-normal'>
							<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
								<Avatar className='h-8 w-8 rounded-lg'>
									<AvatarImage src={profile?.picture ?? ''} alt={profile?.userName} />
									<AvatarFallback className='rounded-lg'>{profile?.userName?.slice(0, 2)?.toUpperCase()}</AvatarFallback>
								</Avatar>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-semibold'>{profile?.userName}</span>
									<span className='truncate text-xs'>{profile?.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Bell />
								Уведомления
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleLogout}>
							<LogOut />
							Выйти из аккаунта
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export function NavUserSkeleton() {
	const { open } = useSidebar()

	return open ? (
		<div className='flex h-[48px] w-[224px] animate-pulse items-center justify-between gap-3 rounded-lg bg-sidebar-accent p-2'>
			<Skeleton className='h-full w-[50px] animate-pulse rounded-lg' />
			<Skeleton className='h-full w-full animate-pulse rounded-lg' />
			<Skeleton className='size-5 animate-pulse rounded-lg' />
		</div>
	) : (
		<Skeleton className='h-[32px] w-[32px] animate-pulse rounded-lg bg-sidebar-accent' />
	)
}
