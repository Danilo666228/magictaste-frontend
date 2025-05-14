import { m } from 'framer-motion'
import { Heart, ShoppingCart } from 'lucide-react'
import { useFormatter } from 'next-intl'
import { useRouter } from 'next/navigation'

import {
	ProductCard,
	ProductCardContent,
	ProductCardFooter,
	ProductCardImage,
	ProductCardLink
} from '@/components/shared/product-card/ProductCard'
import { Button, Skeleton, Typography } from '@/components/ui/common'

import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { useFavorite } from '@/hooks/useFavorite'
import { useProfile } from '@/hooks/useProfile'

import { isActiveFavorite } from '@/lib/utils/favorite/is-active-favorite'
import { cn } from '@/lib/utils/twMerge'

import { Product } from '@/shared/api/types'

import { ROUTE } from '@/config/route.config'

interface ProductListProps {
	products: Product[] | undefined
	take?: number
}

export function ProductList({ products = [], take }: ProductListProps) {
	const { handleAddProduct } = useCart()
	const { profile } = useProfile()
	const { isAuth } = useAuth()
	const formatter = useFormatter()
	const router = useRouter()
	const { toggleFavorite } = useFavorite()

	const displayedProducts = take ? products.slice(0, take) : products

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1
			}
		}
	}

	return (
		<m.ul
			variants={container}
			initial='hidden'
			animate='show'
			className='max-lg-grid-cols-2 grid grid-cols-5 gap-3 max-[1520px]:grid-cols-4 max-xl:grid-cols-3 max-[940px]:grid-cols-2 max-sm:grid-cols-1'>
			{displayedProducts.map(product => (
				<m.li key={product.id} className='flex justify-center'>
					<ProductCardLink id={product.id}>
						<ProductCard
							className='min-h-[150px] min-w-[280px] bg-background/20 transition-all duration-300 hover:shadow-lg'
							product={product}>
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
										<Heart
											size={20}
											className={cn(isActiveFavorite(profile?.data, product) && 'fill-red-500 text-red-500')}
										/>
									</Button>
								)}
								<div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
							</div>
							<ProductCardContent className='flex flex-col gap-3 p-4'>
								<div className='space-y-1'>
									<Typography tag='h3' className='font-medium text-foreground transition-colors group-hover:text-primary'>
										{product.title}
									</Typography>
									<Typography tag='span' className='line-clamp-1 break-words text-sm text-muted-foreground'>
										{product.ingredients
											.map(ingredient => ingredient.title)
											.slice(0, 3)
											.join(', ')}
									</Typography>
								</div>
								<div className='flex items-center justify-between'>
									<div className='flex flex-col'>
										<Typography tag='span' className='text-sm font-medium text-primary'>
											{product.weight} г
										</Typography>
										<Typography tag='span' className='text-lg font-bold text-foreground'>
											{formatter.number(product.price, { style: 'currency', currency: 'RUB' })}
										</Typography>
									</div>
									<ProductCardFooter className='p-0'>
										<Button
											onClick={e => {
												if (!isAuth) router.push(ROUTE.auth.signIn)
												e.preventDefault()
												handleAddProduct(product.id)
											}}
											variant='ghost'
											className='rounded-full bg-primary px-4 text-primary-foreground hover:bg-primary/90'>
											<ShoppingCart className='mr-2 h-4 w-4' />В корзину
										</Button>
									</ProductCardFooter>
								</div>
							</ProductCardContent>
						</ProductCard>
					</ProductCardLink>
				</m.li>
			))}
		</m.ul>
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
