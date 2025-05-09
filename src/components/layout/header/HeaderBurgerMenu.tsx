'use client'

import { Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/common'

import { ROUTE } from '@/config/route.config'

export function HeaderBurgerMenu() {
	const router = useRouter()
	const [open, setOpen] = useState<boolean>(false)

	const onOpenChange = () => setOpen(prev => !prev)

	const handleNavigate = (route: string) => {
		router.push(route)
		onOpenChange()
	}
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetTrigger className='sm:hidden' asChild>
				<Button variant='outline' size='icon'>
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent side='left' className='flex flex-col'>
				<SheetHeader>
					<SheetTitle>Навигационное меню</SheetTitle>
				</SheetHeader>
				<div className='my-auto flex flex-col justify-center gap-5'>
					<Button onClick={() => handleNavigate(ROUTE.home)}>Главная</Button>
					<Button onClick={() => handleNavigate(ROUTE.menu())}>Меню</Button>
					<Button onClick={() => handleNavigate(ROUTE.about)}>О нас</Button>
				</div>
			</SheetContent>
		</Sheet>
	)
}
