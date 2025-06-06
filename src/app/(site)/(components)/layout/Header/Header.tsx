'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button, Typography } from '@/components/ui/common'

import { useProfile } from '@/hooks/useProfile'

import { cn } from '@/shared/utils'
import { ROUTE } from '@/shared/utils/constants/route'

import { Logo } from './Logo'
import { Notifications } from './Notifications'
import { ProfileMenu } from './ProfileMenu'
import { CartButton } from './cart/CartButton'
import { NavMenu } from './navMenu/NavMenu'

export const Header = () => {
	// const { scrollY } = useScroll()
	// const [isScrolled, setIsScrolled] = useState(false)

	const { profile } = useProfile()
	const router = useRouter()

	// useMotionValueEvent(scrollY, 'change', latest => {
	// 	setIsScrolled(latest > 50)
	// })

	return (
		<header
			className={cn(
				'sticky top-0 z-20 m-5 rounded-lg bg-muted p-2 transition-all duration-500 dark:bg-muted/80'
				// isScrolled && 'bg-background/95 shadow-xl backdrop-blur-sm'
			)}>
			<div className='grid grid-cols-3 gap-3 px-4'>
				<Link href={ROUTE.home} className='flex items-center gap-3'>
					<Logo className='transition-transform duration-500 hover:scale-105' width={80} height={80} />
					<div className='flex flex-col gap-2'>
						<Typography className='text-xl font-bold max-md:hidden'>Волшебный вкус</Typography>
						<Typography className='text-sm text-muted-foreground max-xl:hidden'>Ресторан русской кухни в Санкт-Перербурге</Typography>
					</div>
				</Link>

				<NavMenu className='max-md:hidden' />

				<div className='ml-auto flex items-center gap-2 max-sm:ml-auto'>
					<ul className={cn('flex items-center gap-2 max-sm:ml-auto')}>
						{profile ? (
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
					</ul>
				</div>
			</div>
		</header>
	)
}
