import Image from 'next/image'
import Link from 'next/link'
import { ComponentProps } from 'react'

import { Card, CardContent, CardFooter } from '@/components/ui/common'

import { Product } from '@/shared/api/types'

import { ProductCardProvider, useProductCard } from './ProductCardContext'
import { ROUTE } from '@/config/route.config'
import { getMediaSource } from '@/lib/utils'
import { cn } from '@/lib/utils/twMerge'

interface ProductCardProps extends ComponentProps<'div'> {
	product: Product
}
interface ProductCardLinkProps extends ComponentProps<'a'> {
	id: string
}

export const ProductCard = ({ product, className, children, ...props }: ProductCardProps) => {
	return (
		<ProductCardProvider product={product}>
			<Card className={cn('group relative', className)} {...props}>
				{children}
			</Card>
		</ProductCardProvider>
	)
}

export const ProductCardContent = ({ children, className, ...props }: ComponentProps<'div'>) => {
	return (
		<CardContent className={cn('', className)} {...props}>
			{children}
		</CardContent>
	)
}
export const ProductCardFooter = ({ children, className, ...props }: ComponentProps<'div'>) => {
	return (
		<CardFooter className={cn('', className)} {...props}>
			{children}
		</CardFooter>
	)
}

export const ProductCardLink = ({ id, children, ...props }: ProductCardLinkProps) => {
	return (
		<Link href={ROUTE.product(id)} {...props}>
			{children}
		</Link>
	)
}

export const ProductCardImage = () => {
	const { product } = useProductCard()

	return (
		<div className='relative aspect-[4/3] overflow-hidden'>
			<Image
				src={getMediaSource(product.imageUrl)}
				alt={product.title}
				fill
				className='object-contain transition-transform duration-300 group-hover:scale-105'
			/>
		</div>
	)
}
