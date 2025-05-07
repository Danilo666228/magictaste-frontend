import { Menu } from 'lucide-react'

import { Button, Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/common'

import { NavMenu } from './navMenu/NavMenu'

export function HeaderBurgerMenu() {
	return (
		<Sheet>
			<SheetTrigger className='sm:hidden' asChild>
				<Button variant='outline' size='icon'>
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent side='left'>
				<SheetHeader>
					{/* <SheetTitle>Edit profile</SheetTitle> */}
					{/* <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription> */}
				</SheetHeader>
				<NavMenu className='flex flex-col' />
			</SheetContent>
		</Sheet>
	)
}
