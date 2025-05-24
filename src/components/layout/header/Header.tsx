'use client'

import { cn } from '@/lib/utils/twMerge'

import { HeaderAction } from './HeaderAction'
import { HeaderBurgerMenu } from './HeaderBurgerMenu'
import { Logo } from './Logo'
import { NavMenu } from './navMenu/NavMenu'

export function Header() {
	return (
		<header className={cn('sticky top-0 z-20 p-2 opacity-95')}>
			<div className={cn('grid w-full grid-cols-[auto_1fr_auto] items-center gap-8 rounded-xl bg-muted px-6 transition-all duration-300')}>
				<Logo />
				<HeaderBurgerMenu />
				<NavMenu className='max-sm:hidden' />
				<HeaderAction />
			</div>
		</header>
	)
}
