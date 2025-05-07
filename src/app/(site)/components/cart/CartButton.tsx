import { ShoppingCart } from 'lucide-react'

import { Button, Typography } from '@/components/ui/common'

import { useCart } from '@/hooks/useCart'

import { Cart } from './Cart'

export function CartButton() {
	const { cart } = useCart()

	return (
		<Cart>
			<Button variant='outline' className='relative transition-transform'>
				<span className='mr-2'>Корзина</span>
				<ShoppingCart className='h-5 w-5' />
				{(cart?.data.totalItems ?? 0) > 0 && (
					<Typography className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground'>
						{cart?.data.totalItems}
					</Typography>
				)}
			</Button>
		</Cart>
	)
}
