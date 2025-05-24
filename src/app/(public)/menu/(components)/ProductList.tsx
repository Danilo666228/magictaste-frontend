import { Heart, ShoppingCart } from 'lucide-react'
import { useFormatter } from 'next-intl'
import { useRouter } from 'next/navigation'
import { ComponentProps } from 'react'

import { ProductCard, ProductCardContent, ProductCardFooter, ProductCardImage, ProductCardLink } from '@/components/shared/product-card/ProductCard'
import { Button, Skeleton, Typography } from '@/components/ui/common'

import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { useFavorite } from '@/hooks/useFavorite'
import { useProfile } from '@/hooks/useProfile'

import { isActiveFavorite } from '@/lib/utils/favorite/is-active-favorite'
import { cn } from '@/lib/utils/twMerge'

import { Product } from '@/shared/api/types'

import { ROUTE } from '@/config/route.config'

interface ProductListProps extends ComponentProps<'div'> {
	products: Product[] | undefined
	take?: number
}

export function ProductList({ products = [], take, className, ...props }: ProductListProps) {
	const { handleAddProduct } = useCart()
	const { profile } = useProfile()
	const { isAuth } = useAuth()
	const formatter = useFormatter()
	const router = useRouter()
	const { toggleFavorite } = useFavorite()

	const displayedProducts = take ? products.slice(0, take) : products

	return (
		<div className={cn('flex flex-row flex-wrap gap-3', className)} {...props}>
			{displayedProducts.map(product => (
				<article key={product.id} className='ml-5 max-h-[400px] max-w-[280px] min-w-[280px]'>
					<ProductCardLink id={product.id}>
						<ProductCard className='bg-background/20 transition-all duration-300 hover:shadow-lg' product={product}>
							<div className='relative overflow-hidden rounded-t-xl'>
								<ProductCardImage />
								{isAuth && (
									<Button
										variant={'outline'}
										onClick={e => {
											e.preventDefault()
											toggleFavorite(product.id)
										}}
										size={'icon'}
										className='absolute right-3 top-3 z-10 h-9 w-9 rounded-full border-none bg-background/20 text-gray-600 shadow-sm backdrop-blur-[2px] transition-all hover:scale-110 hover:bg-background/30 hover:text-red-500 hover:shadow-md active:scale-95'>
										<Heart size={20} className={cn(isActiveFavorite(profile?.data, product) && 'fill-red-500 text-red-500')} />
									</Button>
								)}
								<div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
							</div>
							<ProductCardContent className='flex flex-col gap-3 p-4'>
								<div className='space-y-1'>
									<Typography tag='h3' className='font-medium text-foreground transition-colors group-hover:text-primary'>
										{product.title}
									</Typography>
									<Typography tag='p' className='truncate text-sm text-muted-foreground'>
										{product.ingredients.map(ingredient => ingredient.title).join(', ')}
									</Typography>
								</div>

								<ProductCardFooter className='flex flex-row items-center justify-between gap-3 p-0'>
									<div className='flex flex-col max-xl:text-sm'>
										<Typography tag='span' className='text-sm font-medium text-primary'>
											{product.weight} г
										</Typography>
										<Typography tag='span' className='text-lg font-bold text-foreground'>
											{formatter.number(product.price, { style: 'currency', currency: 'RUB' })}
										</Typography>
									</div>
									<Button
										onClick={e => {
											if (!isAuth) router.push(ROUTE.auth.signIn)
											e.preventDefault()
											handleAddProduct(product.id)
										}}
										variant='outline'
										className='bg-primary text-primary-foreground'>
										<ShoppingCart className='mr-2 h-4 w-4 max-2xl:hidden' />В корзину
									</Button>
								</ProductCardFooter>
							</ProductCardContent>
						</ProductCard>
					</ProductCardLink>
				</article>
			))}
		</div>
	)
}

export function ProductListSkeleton() {
	return (
		<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
			{Array.from({ length: 10 }, (_, index) => (
				<div key={index} className='flex justify-center'>
					<div className='w-full max-w-[280px]'>
						<Skeleton className='mb-3 h-48 w-full rounded-xl' />
						<Skeleton className='mb-2 h-6 w-3/4' />
						<Skeleton className='mb-3 h-4 w-1/2' />
						<Skeleton className='h-10 w-full rounded-lg' />
					</div>
				</div>
			))}
		</div>
	)
}
