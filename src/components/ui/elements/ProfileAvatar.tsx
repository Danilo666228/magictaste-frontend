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

import { routeConfig } from '@/config/route.config'
import { getMediaSource } from '@/lib/utils/getMediaSource'

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
					<DropdownMenuItem onClick={() => router.push(routeConfig.profile)}>Профиль</DropdownMenuItem>
					<DropdownMenuItem onClick={() => router.push(routeConfig.orders)}>Мои заказы</DropdownMenuItem>
					<DropdownMenuItem onClick={() => router.push(routeConfig.settings)}>Настройки</DropdownMenuItem>
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
