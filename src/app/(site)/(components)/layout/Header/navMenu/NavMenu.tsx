'use client'

import { ComponentProps } from 'react'

import { NavigationMenu, NavigationMenuList } from '@/components/ui/common'

import { cn } from '@/shared/hooks/helpers'

import { NavigationAbout } from './NavigationItems/NavigationAbout'
import { NavigationCatalog } from './NavigationItems/NavigationCatalog'
import { NavigationMain } from './NavigationItems/NavigationMain'

interface NavMenu extends ComponentProps<typeof NavigationMenu> {}

export function NavMenu({ className }: NavMenu) {
	return (
		<NavigationMenu className={cn('mx-auto', className)}>
			<NavigationMenuList className='gap-3'>
				<NavigationMain />
				<NavigationCatalog />
				<NavigationAbout />
			</NavigationMenuList>
		</NavigationMenu>
	)
}
