'use client'

import { HeaderAction } from './HeaderAction'
import { HeaderBurgerMenu } from './HeaderBurgerMenu'
import { Logo } from './Logo'
import { NavMenu } from './navMenu/NavMenu'
import { cn } from '@/lib/utils/twMerge'
import { useEffect, useState } from 'react'

export function Header() {
	const [isScroll, setIsScroll] = useState<boolean>(false)
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsScroll(true)
			} else {
				setIsScroll(false)
			}
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)

	}, [])

	return (
		<header className={cn('sticky top-0 z-20 w-full ')}>
			<div className={cn('w-full transition-all duration-200 ease-in-out')}>
				<div
					className={cn('grid w-full grid-cols-[auto_1fr_auto] items-center gap-8 bg-muted px-6 transition-all duration-300')}>
					<Logo />
					<HeaderBurgerMenu />
					<NavMenu className="max-sm:hidden" />
					<HeaderAction />
				</div>
			</div>
		</header>
	)
}
