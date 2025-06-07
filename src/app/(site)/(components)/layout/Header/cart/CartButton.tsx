'use client'

import { ArrowRight, ShoppingCart } from 'lucide-react'

import { Button, Typography } from '@/components/ui/common'

import { useCart } from '@/hooks/useCart'

import { useHover } from '@/shared/hooks'
import { cn } from '@/shared/hooks/helpers'

import { Cart } from './Cart'

export function CartButton() {
	const { cart } = useCart()
	const hover = useHover<HTMLButtonElement>()

	return (
		<Cart>
			<Button ref={hover.ref} variant='outline' className='relative transition-all duration-300 hover:text-primary'>
				<Typography className='mr-2'>Корзина</Typography>
				<div className={cn(hover.value && 'translate-x-1 transform transition-transform duration-300')}>
					{hover.value ? <ArrowRight /> : <ShoppingCart />}
				</div>
				{(cart?.data.totalItems ?? 0) > 0 && (
					<Typography className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground'>
						{cart?.data.totalItems}
					</Typography>
				)}
			</Button>
		</Cart>
	)
}
