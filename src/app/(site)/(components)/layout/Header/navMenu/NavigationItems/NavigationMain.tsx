'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { NavigationMenuItem, Typography } from '@/components/ui/common'

import { cn } from '@/shared/hooks/helpers'
import { ROUTE } from '@/shared/utils/constants/route'

export function NavigationMain() {
	const pathname = usePathname()
	const isActive = pathname === '/'
	return (
		<NavigationMenuItem className='group relative'>
			<Link
				className={cn(
					'relative block transform-gpu overflow-hidden rounded-lg px-3 py-2 transition-all duration-300 hover:bg-primary/5',
					'before:absolute before:inset-0 before:bg-primary/0 before:transition-colors before:duration-300 hover:before:bg-primary/20'
				)}
				href={ROUTE.home}>
				<Typography className='relative z-10 font-medium'>Главная</Typography>
				<div className={cn('absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300', isActive ? 'w-full' : 'w-0')} />
			</Link>
		</NavigationMenuItem>
	)
}
