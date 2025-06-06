'use client'

import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
	Typography
} from '@/components/ui/common'
import { ThemeToggle } from '@/components/ui/elements/theme/ThemeToggle'

import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'

import { getMediaSource } from '@/shared/utils'
import { ROUTE } from '@/shared/utils/constants/route'

export function ProfileMenu() {
	const { handleLogout } = useAuth()
	const router = useRouter()
	const { profile, isPending } = useProfile()

	return isPending || !profile ? (
		<Loader2 size={32} className='animate-spin text-primary' />
	) : (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar className='border'>
					<AvatarImage src={getMediaSource(profile.data.picture)} />
					<AvatarFallback>{profile.data.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='center' className='min-w-[200px]'>
				<DropdownMenuLabel>
					<div className='flex items-center gap-3'>
						<div>
							<Avatar className=''>
								<AvatarImage className='' src={getMediaSource(profile.data.picture)} />
								<AvatarFallback>{profile.data.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
							</Avatar>
						</div>
						<div className='max-w-[150px] truncate font-medium'>
							<Typography tag='h3' className='text-sm'>
								{profile.data.userName}
							</Typography>
							<Typography tag='span' className='text-xs text-muted-foreground'>
								{profile.data.email}
							</Typography>
						</div>
						<ThemeToggle />
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => router.push(ROUTE.dashboard.profile)}>Профиль</DropdownMenuItem>
					<DropdownMenuItem onClick={() => router.push(ROUTE.dashboard.orders)}>Мои заказы</DropdownMenuItem>
					<DropdownMenuItem onClick={() => router.push(ROUTE.dashboard.settings.profile)}>Настройки</DropdownMenuItem>
					<DropdownMenuItem onClick={handleLogout}>Выйти из аккаунта</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
