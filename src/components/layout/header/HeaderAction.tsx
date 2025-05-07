'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/common'
import { ThemeToggle } from '@/components/ui/elements/theme/ThemeToggle'

import { useAuth } from '@/hooks/useAuth'



import { Notifications } from './Notifications'
import { ProfileMenu } from './ProfileMenu'
import { ROUTE } from '@/config/route.config'
import { cn } from '@/lib/utils/twMerge'
import { CartButton } from '@/app/(site)/components/cart/CartButton'

interface HeaderActionProps {
	className?: string
}

export function HeaderAction({ className }: HeaderActionProps) {
	const { isAuth } = useAuth()
	const router = useRouter()
	return (
		<ul className={cn('flex items-center gap-2 max-sm:ml-auto', className)}>
			{isAuth ? (
				<>
					<Notifications />
					<ProfileMenu />
					<li>
						<CartButton />
					</li>
				</>
			) : (
				<>
					<li>
						<Button onClick={() => router.push(ROUTE.auth.signIn)}>Вход</Button>
					</li>
					<li>
						<Button onClick={() => router.push(ROUTE.auth.signUp)}>Регистрация</Button>
					</li>
				</>
			)}
			<ThemeToggle />
		</ul>
	)
}
