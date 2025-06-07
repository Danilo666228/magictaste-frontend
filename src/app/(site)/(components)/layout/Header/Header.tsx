'use client'

import { useMotionValueEvent, useScroll } from 'framer-motion'
import { Loader2Icon } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button, List, ListItem, Typography } from '@/components/ui/common'

import { cn } from '@/shared/hooks/helpers'
import { ROUTE } from '@/shared/utils/constants/route'
import { useProfile } from '@/shared/utils/contexts'

import { BurgerMenu } from './BurgerMenu'
import { Logo } from './Logo'
import { Notifications } from './Notifications'
import { ProfileMenu } from './ProfileMenu'
import { CartButton } from './cart/CartButton'
import { NavMenu } from './navMenu/NavMenu'

const ThemeToggle = dynamic(() => import('@/components/ui/elements/theme/ThemeToggle').then(module => module.ThemeToggle), {
	ssr: false,
	loading: () => (
		<Button size='icon' variant='ghost'>
			<Loader2Icon className='size-4 animate-spin' />
		</Button>
	)
})

export const Header = () => {
	const { scrollY } = useScroll()
	const [isScrolled, setIsScrolled] = useState(false)

	const { isAuth } = useProfile()
	const router = useRouter()

	useMotionValueEvent(scrollY, 'change', latest => {
		setIsScrolled(latest > 50)
	})

	return (
		<header
			className={cn(
				'sticky top-0 z-20 m-5 rounded-lg bg-muted p-2 transition-all duration-500 dark:bg-muted/80',
				isScrolled && 'bg-background/95 shadow-xl backdrop-blur-sm'
			)}>
			<div className='flex items-center justify-between gap-3 px-4'>
				<Link href={ROUTE.home} className='flex items-center gap-3'>
					<Logo className='transition-transform duration-500 hover:scale-105' width={80} height={80} />
					<div className='flex flex-col gap-2'>
						<Typography className='text-xl font-bold max-md:hidden'>Волшебный вкус</Typography>
						<Typography className='text-sm text-muted-foreground max-xl:hidden'>Ресторан русской кухни в Санкт-Перербурге</Typography>
					</div>
				</Link>
				<BurgerMenu />

				<NavMenu className='max-md:hidden' />

				<div className='ml-auto flex items-center gap-2 max-sm:ml-auto'>
					<List className='flex items-center gap-2 max-sm:ml-auto'>
						{isAuth ? (
							<>
								<ListItem>
									<Notifications />
								</ListItem>
								<ListItem>
									<ProfileMenu />
								</ListItem>
								<ListItem>
									<CartButton />
								</ListItem>
							</>
						) : (
							<>
								<ListItem>
									<Button onClick={() => router.push(ROUTE.auth.signIn)}>Вход</Button>
								</ListItem>
								<ListItem>
									<Button onClick={() => router.push(ROUTE.auth.signUp)}>Регистрация</Button>
								</ListItem>
							</>
						)}
					</List>
				</div>
				<ThemeToggle />
			</div>
		</header>
	)
}
