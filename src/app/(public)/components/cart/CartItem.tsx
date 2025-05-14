import { Minus, Plus, X } from 'lucide-react'
import { useFormatter } from 'next-intl'
import Image from 'next/image'

import { Button, Separator, Typography } from '@/components/ui/common'

import { useCart } from '@/hooks/useCart'

import { getMediaSource } from '@/lib/utils'

import { CartItem as CartItemType } from '@/shared/api/types/cart'

interface CartItemProps {
	item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
	const formatted = useFormatter()
	const { handleAddProduct, handleDecreaseItem, handleDeleteItem } = useCart()

	return (
		<div className='space-y-3'>
			<div className='grid grid-cols-[80px_1fr_auto] items-center gap-4'>
				<div className='relative aspect-square overflow-hidden rounded-md'>
					<Image
						src={getMediaSource(item.product.imageUrl)}
						alt={item.product.title}
						fill
						className='object-cover'
						sizes='80px'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<Typography className='font-medium'>{item.product.title}</Typography>
					<Typography className='text-sm text-muted-foreground'>
						{item.quantity} шт ×{' '}
						{formatted.number(item.product.price, {
							style: 'currency',
							currency: 'RUB'
						})}
					</Typography>
				</div>

				<Button
					onClick={() => handleDeleteItem(item.product.id)}
					size='icon'
					variant='ghost'
					className='mb-auto h-8 w-8 opacity-60 hover:opacity-100'>
					<X className='h-4 w-4' />
				</Button>
			</div>

			<Separator />

			<div className='flex items-center justify-between'>
				<Typography className='text-lg font-bold'>
					{formatted.number(item.product.price * item.quantity, {
						style: 'currency',
						currency: 'RUB'
					})}
				</Typography>

				<div className='flex items-center gap-3 rounded-lg bg-muted p-1'>
					<Button onClick={() => handleDecreaseItem(item.product.id)} size='icon' variant='ghost' className='h-8 w-8'>
						<Minus className='h-4 w-4' />
					</Button>

					<Typography className='w-8 text-center'>{item.quantity}</Typography>

					<Button onClick={() => handleAddProduct(item.product.id)} size='icon' variant='ghost' className='h-8 w-8'>
						<Plus className='h-4 w-4' />
					</Button>
				</div>
			</div>
		</div>
	)
}
