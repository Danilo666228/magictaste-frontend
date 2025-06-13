import { Heart, ShoppingCart, Star } from 'lucide-react'
import { useFormatter } from 'next-intl'
import { ComponentProps } from 'react'
import { toast } from 'sonner'

import { ProductCard, ProductCardContent, ProductCardFooter, ProductCardImage, ProductCardLink } from '@/components/shared/product-card/ProductCard'
import { Badge, Button, Skeleton, Typography } from '@/components/ui/common'

import { useCart } from '@/hooks/useCart'
import { useFavorite } from '@/hooks/useFavorite'

import { isActiveFavorite } from '@/shared/api/helpers/is-active-favorite'
import { Product } from '@/shared/api/types'
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

	const { toggleFavorite } = useFavorite()

	const displayedProducts = take ? products.slice(0, take) : products

	return (
		<div className='relative'>
			<div className={cn('grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 sm:gap-8', className)} {...props}>
				{displayedProducts.map(product => (
					<article key={product.id} className='group relative flex justify-center'>
						<ProductCardLink id={product.id} className='w-full'>
							<ProductCard
								className='group relative mx-auto flex h-fit min-h-[380px] w-full max-w-[320px] flex-col overflow-hidden rounded-2xl border bg-background/40 shadow-lg backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10'
								product={product}>
								<div className='relative overflow-hidden rounded-t-2xl'>
									<div className='h-56'>
										<ProductCardImage />
									</div>

									<Badge className='absolute left-3 top-3 rounded-full bg-gradient-to-r from-primary/90 to-primary/70 px-3 py-1 text-xs text-background shadow-lg transition-all duration-300'>
										{product.weight}г
									</Badge>

									{isAuth && (
										<Button
											variant={'outline'}
											onClick={e => {
												e.preventDefault()
												toggleFavorite(product.id)
											}}
											size={'icon'}
											className='absolute right-3 top-3 z-10 h-10 w-10 border-none bg-background/80 text-gray-600 shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-background/90 hover:text-red-500 hover:shadow-xl active:scale-95'>
											<Heart size={18} className={cn(isActiveFavorite(profile, product) && 'fill-red-500 text-red-500')} />
										</Button>
									)}

									<Badge className='absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100'>
										<Star size={12} className='fill-yellow-400 text-yellow-400' />
										<Typography tag='span' className='text-xs'>
											4.8
										</Typography>
									</Badge>
								</div>

								<ProductCardContent className='flex flex-col gap-2'>
									<Typography
										tag='h3'
										className='truncate text-lg font-semibold text-foreground transition-colors group-hover:text-primary'>
										{product.title}
									</Typography>
									<Typography tag='p' className='truncate text-sm leading-relaxed text-muted-foreground'>
										{product.ingredients.map(ingredient => ingredient.title).join(', ')}
									</Typography>
								</ProductCardContent>

								<ProductCardFooter className='mt-auto flex flex-row items-center justify-between gap-4'>
									<div className='flex flex-col'>
										<Typography tag='span' className='text-lg font-bold text-foreground lg:text-2xl'>
											{formatter.number(product.price, { style: 'currency', currency: 'RUB' })}
										</Typography>
										<Typography tag='span' className='text-xs text-muted-foreground'>
											за порцию
										</Typography>
									</div>
									<Button
										onClick={e => {
											e.preventDefault()
											if (!isAuth) {
												toast.error('Для добавления в корзину необходимо авторизоваться')
												return
											}

											handleAddProduct(product.id)
										}}
										className='group/btn relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25'>
										<div className='absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-700 group-hover/btn:translate-x-[100%]' />
										<ShoppingCart className='mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110 max-2xl:hidden' />В
										корзину
									</Button>
								</ProductCardFooter>
							</ProductCard>
						</ProductCardLink>
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

			<div className='grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 sm:gap-8'>
				{Array.from({ length: 10 }, (_, index) => (
					<div key={index} className='flex justify-center'>
						<div className='mx-auto min-h-[420px] w-full max-w-[320px] rounded-2xl bg-background/40 p-4 shadow-lg backdrop-blur-sm'>
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
