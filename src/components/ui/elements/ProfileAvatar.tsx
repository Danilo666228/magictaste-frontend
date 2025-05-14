import { UserCircle } from 'lucide-react'
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
	DropdownMenuTrigger
} from '@/components/ui/common'

import { useAuth } from '@/hooks/useAuth'

import { getMediaSource } from '@/lib/utils'

import { ROUTE } from '@/config/route.config'

interface ProfileAvatarProps {
	avatar: string | null
}

export function ProfileAvatar({ avatar }: ProfileAvatarProps) {
	const { handleLogout } = useAuth()
	const router = useRouter()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage width={70} height={70} src={getMediaSource(avatar)} />
					<AvatarFallback>
						<UserCircle />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>Мой профиль</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => router.push(ROUTE.dashboard.profile)}>Профиль</DropdownMenuItem>
					<DropdownMenuItem onClick={() => router.push(ROUTE.dashboard.orders)}>Мои заказы</DropdownMenuItem>
					<DropdownMenuItem onClick={() => router.push(ROUTE.dashboard.settings.profile)}>Настройки</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout}>Выйти из аккаунта</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
export function ProfileAvatarSkeleton() {
	return <div className='h-[30px] w-[30px] rounded-full bg-foreground' />
}
