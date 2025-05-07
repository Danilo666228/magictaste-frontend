import { useFormatter } from 'next-intl'
import Image from 'next/image'

import { Container, Typography } from '@/components/ui/common'

import { Product } from '@/shared/api/types/product'

import { getMediaSource } from '@/lib/utils'

interface OrderItemProps {
	product: Product
	quantity: number
}

export function OrderItem({ product, quantity }: OrderItemProps) {
	const formatted = useFormatter()
	return (
		<Container className='flex items-start gap-3'>
			{product.imageUrl && (
				<div className='relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md'>
					<Image
						src={getMediaSource(product.imageUrl)}
						alt={product.title}
						fill
						sizes='(max-width: 768px) 100vw, 33vw'
						className='object-cover'
					/>
				</div>
			)}
			<div className='flex flex-1 flex-col'>
				<div className='flex justify-between'>
					<Typography className='font-medium'>{product?.title}</Typography>
					<Typography className='ml-2 font-medium'>
						{formatted.number(product.price * quantity, { style: 'currency', currency: 'RUB' })}
					</Typography>
				</div>
				<Typography className='text-xs text-gray-500'>
					{product?.ingredients.map(ingredient => ingredient?.title).join(', ')}
				</Typography>
				<div className='mt-1 flex items-center text-sm text-gray-600'>
					<span>{quantity} шт.</span>
					<span className='mx-1'>×</span>
					<span>{formatted.number(product.price, { style: 'currency', currency: 'RUB' })}</span>
				</div>
			</div>
		</Container>
	)
}
