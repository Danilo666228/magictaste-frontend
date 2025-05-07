'use client'

import { motion } from 'framer-motion'

import { HeaderAction } from './HeaderAction'
import { HeaderBurgerMenu } from './HeaderBurgerMenu'
import { Logo } from './Logo'
import { NavMenu } from './navMenu/NavMenu'
import { cn } from '@/lib/utils/twMerge'

export function Header() {
	return (
		<motion.div className='sticky top-0 z-20 w-full' initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.3 }}>
			<motion.header className='w-full'>
				<div className={cn('w-full transition-all duration-200 ease-in-out')}>
					<div className={cn('grid w-full grid-cols-[auto_1fr_auto] items-center gap-8 bg-muted px-6 transition-all duration-300')}>
						<Logo />
						<HeaderBurgerMenu />
						<NavMenu className='max-sm:hidden' />
						<HeaderAction />
					</div>
				</div>
			</motion.header>
		</motion.div>
	)
}
