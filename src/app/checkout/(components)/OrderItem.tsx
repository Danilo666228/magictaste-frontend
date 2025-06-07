import { useFormatter } from 'next-intl'
import Image from 'next/image'

import { Container, Typography } from '@/components/ui/common'

import { Product } from '@/shared/api/types/product'
import { getMediaSource } from '@/shared/hooks/helpers'

interface OrderItemProps {
	product: Product
	quantity: number
}

export function OrderItem({ product, quantity }: OrderItemProps) {
	const formatted = useFormatter()

	return (
		<Container className='group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-primary/5'>
			{product.imageUrl && (
				<div className='relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl shadow-md transition-transform group-hover:scale-105'>
					<Image
						src={getMediaSource(product.imageUrl)}
						alt={product.title}
						fill
						sizes='(max-width: 768px) 100vw, 33vw'
						className='object-cover'
					/>
				</div>
			)}

			<div className='flex flex-1 flex-col space-y-2'>
				<div className='flex items-start justify-between'>
					<Typography className='font-semibold leading-tight text-foreground transition-colors group-hover:text-primary'>
						{product?.title}
					</Typography>
					<Typography className='ml-3 text-lg font-bold text-primary'>
						{formatted.number(product.price * quantity, { style: 'currency', currency: 'RUB' })}
					</Typography>
				</div>

				<Typography className='line-clamp-2 text-xs leading-relaxed text-muted-foreground'>
					{product?.ingredients.map(ingredient => ingredient?.title).join(', ')}
				</Typography>

				<div className='flex items-center gap-3 text-sm'>
					<div className='flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1'>
						<Typography className='text-muted-foreground'>{quantity} шт.</Typography>
						<Typography className='text-muted-foreground'>×</Typography>
						<Typography className='font-medium text-foreground'>
							{formatted.number(product.price, { style: 'currency', currency: 'RUB' })}
						</Typography>
					</div>
					<div className='text-xs text-muted-foreground'>{product.weight}г</div>
				</div>
			</div>
		</Container>
	)
}
