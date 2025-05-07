'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { NavigationMenuItem } from '@/components/ui/common'

import { cn } from '@/lib/utils'
import { ROUTE } from '@/config/route.config'

export function NavigationMain() {
	const pathname = usePathname()
	return (
		<NavigationMenuItem className='relative'>
			<Link
				className={cn(
					'block rounded p-1 transition-all duration-300',
					'after:absolute after:bottom-[-4px] after:left-1/2 after:h-0.5 after:origin-center after:bg-primary after:transition-all after:duration-300',
					pathname === '/' ? 'after:left-0 after:w-full' : 'after:w-0',
					'hover:after:left-0 hover:after:w-full'
				)}
				href={ROUTE.home}>
				Главная
			</Link>
		</NavigationMenuItem>
	)
}
