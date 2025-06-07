import { Heart, ShoppingCart, Star } from 'lucide-react'
import { useFormatter } from 'next-intl'
import { useRouter } from 'next/navigation'
import { ComponentProps } from 'react'

import { ProductCard, ProductCardContent, ProductCardFooter, ProductCardImage, ProductCardLink } from '@/components/shared/product-card/ProductCard'
import { Button, Skeleton, Typography } from '@/components/ui/common'

import { useCart } from '@/hooks/useCart'
import { useFavorite } from '@/hooks/useFavorite'

import { isActiveFavorite } from '@/shared/api/helpers/is-active-favorite'
import { Product } from '@/shared/api/types'
import { ROUTE } from '@/shared/utils/constants/route'
import { useProfile } from '@/shared/utils/contexts'
import { cn } from '@/shared/utils/twMerge'

interface ProductListProps extends ComponentProps<'div'> {
	products: Product[] | undefined
	take?: number
}

export function ProductList({ products = [], take, className, ...props }: ProductListProps) {
	const formatter = useFormatter()
	const { handleAddProduct } = useCart()
	const { profile, isAuth } = useProfile()

	const router = useRouter()
	const { toggleFavorite } = useFavorite()

	const displayedProducts = take ? products.slice(0, take) : products

	return (
		<div className='relative'>
			<div className={cn('grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5', className)} {...props}>
				{displayedProducts.map(product => (
					<article key={product.id} className='group relative flex justify-center'>
						<div className='relative w-full max-w-[300px]'>
							<ProductCardLink id={product.id}>
								<ProductCard
									className='group relative overflow-hidden rounded-2xl border-0 bg-background/40 shadow-lg backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10'
									product={product}>
									<div className='relative overflow-hidden rounded-t-2xl'>
										<div className='h-56'>
											<ProductCardImage />
										</div>

										<div className='absolute left-3 top-3 rounded-full bg-gradient-to-r from-primary/90 to-primary/70 px-3 py-1 text-xs font-medium text-white shadow-lg transition-all duration-300 group-hover:scale-105'>
											{product.weight}г
										</div>

										{isAuth && (
											<Button
												variant={'outline'}
												onClick={e => {
													e.preventDefault()
													toggleFavorite(product.id)
												}}
												size={'icon'}
												className='absolute right-3 top-3 z-10 h-10 w-10 rounded-full border-none bg-background/80 text-gray-600 shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-background/90 hover:text-red-500 hover:shadow-xl active:scale-95'>
												<Heart size={18} className={cn(isActiveFavorite(profile, product) && 'fill-red-500 text-red-500')} />
											</Button>
										)}

										<div className='absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100'>
											<Star size={12} className='fill-yellow-400 text-yellow-400' />
											<span>4.8</span>
										</div>
									</div>

									<ProductCardContent className='flex flex-col gap-4 p-5'>
										<div className='space-y-2'>
											<Typography
												tag='h3'
												className='line-clamp-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary'>
												{product.title}
											</Typography>
											<Typography tag='p' className='line-clamp-2 text-sm leading-relaxed text-muted-foreground'>
												{product.ingredients.map(ingredient => ingredient.title).join(', ')}
											</Typography>
										</div>

										<ProductCardFooter className='flex flex-row items-center justify-between gap-4 p-0'>
											<div className='flex flex-col'>
												<Typography tag='span' className='text-2xl font-bold text-foreground'>
													{formatter.number(product.price, { style: 'currency', currency: 'RUB' })}
												</Typography>
												<Typography tag='span' className='text-xs text-muted-foreground'>
													за порцию
												</Typography>
											</div>
											<Button
												onClick={e => {
													if (!isAuth) router.push(ROUTE.auth.signIn)
													e.preventDefault()
													handleAddProduct(product.id)
												}}
												className='group/btn relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25'>
												<div className='absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-700 group-hover/btn:translate-x-[100%]'></div>
												<ShoppingCart className='mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110 max-2xl:hidden' />
												В корзину
											</Button>
										</ProductCardFooter>
									</ProductCardContent>
								</ProductCard>
							</ProductCardLink>
						</div>
					</article>
				))}
			</div>
		</div>
	)
}

export function ProductListSkeleton() {
	return (
		<div className='relative'>
			<div className='absolute inset-0 -z-10 overflow-hidden'>
				<div className='absolute left-1/4 top-10 h-32 w-32 animate-pulse rounded-full bg-muted/30 blur-2xl'></div>
				<div className='absolute right-1/3 top-1/2 h-24 w-24 animate-pulse rounded-full bg-muted/20 blur-xl'></div>
			</div>

			<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
				{Array.from({ length: 10 }, (_, index) => (
					<div key={index} className='flex justify-center'>
						<div className='w-full max-w-[300px] rounded-2xl bg-background/40 p-4 shadow-lg backdrop-blur-sm'>
							<Skeleton className='mb-4 h-56 w-full rounded-xl' />
							<div className='space-y-3'>
								<Skeleton className='h-6 w-3/4' />
								<Skeleton className='h-4 w-full' />
								<Skeleton className='h-4 w-2/3' />
								<div className='flex items-center justify-between pt-2'>
									<Skeleton className='h-8 w-20' />
									<Skeleton className='h-10 w-24 rounded-lg' />
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
