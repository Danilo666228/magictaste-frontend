'use client'

import { useRouter } from 'next/navigation'

import { CartButton } from '@/app/(site)/(components)/layout/Header/cart/CartButton'

import { Button } from '@/components/ui/common'
import { ThemeToggle } from '@/components/ui/elements/theme/ThemeToggle'

import { useAuth } from '@/hooks/useAuth'

import { cn } from '@/lib/utils/twMerge'

import { ROUTE } from '@/shared/utils/constants/route'

import { Notifications } from './Notifications'
import { ProfileMenu } from './ProfileMenu'

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
