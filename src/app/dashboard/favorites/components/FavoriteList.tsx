import { useQueryClient } from '@tanstack/react-query'
import { m } from 'framer-motion'
import { Heart, ShoppingCart } from 'lucide-react'
import { useFormatter } from 'next-intl'
import Link from 'next/link'

import {
	ProductCard,
	ProductCardContent,
	ProductCardFooter,
	ProductCardImage,
	ProductCardLink
} from '@/components/shared/product-card/ProductCard'
import { Button, Typography } from '@/components/ui/common'

import { useCart } from '@/hooks/useCart'
import { useProfile } from '@/hooks/useProfile'

import { useToggleFavoriteMutation } from '@/shared/api/hooks/favorite/useToggleFavoriteMutation'
import { Favorite } from '@/shared/api/types'

import { ROUTE } from '@/config/route.config'
import { cn } from '@/lib/utils/twMerge'

interface FavoriteListProps {
	favorites: Favorite[] | undefined
}

export function FavoriteList({ favorites }: FavoriteListProps) {
	const queryClient = useQueryClient()
	const formatter = useFormatter()
	const { profile } = useProfile()

	const { addProduct } = useCart()
	const { mutate: toggleFavorite } = useToggleFavoriteMutation({
		options: {
			onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getFavoriteProducts'] })
		}
	})

	const handleAddProduct = (id: string) => {
		addProduct({
			params: {
				productId: id
			}
		})
	}

	const handleToggleFavorite = (id: string) => {
		toggleFavorite({
			config: {
				params: {
					productId: id
				}
			}
		})
	}

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1
			}
		}
	}

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
	}

	if (!favorites?.length) {
		return (
			<div className='flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-muted-foreground/50 p-12 text-center'>
				<div className='rounded-full border bg-background p-3 shadow-md'>
					<Heart className='h-8 w-8 fill-red-500 text-red-500' />
				</div>
				<Typography tag='h3' className='text-muted-foreground'>
					Добавьте товары в избранное, чтобы просматривать их здесь
				</Typography>
				<Link href={ROUTE.menu()} className='text-primary'>
					<Typography tag={'h3'}>Перейти в меню</Typography>
				</Link>
			</div>
		)
	}

	return (
		<m.ul
			variants={container}
			initial='hidden'
			animate='show'
			className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
			{favorites.map(favorite => (
				<m.li key={favorite.id} variants={item}>
					<ProductCardLink id={favorite.product.id}>
						<ProductCard className='min-w-[280px] transition-all duration-300 hover:shadow-lg' product={favorite.product}>
							<div className='relative overflow-hidden rounded-t-xl'>
								<ProductCardImage />
								<Button
									variant={'outline'}
									onClick={e => {
										e.preventDefault()
										handleToggleFavorite(favorite.product.id)
									}}
									size={'icon'}
									className='absolute right-3 top-3 z-10 h-9 w-9 rounded-full border-none bg-white/80 text-gray-600 shadow-sm backdrop-blur-[2px] transition-all hover:scale-110 hover:bg-white hover:text-red-500 hover:shadow-md active:scale-95'>
									<Heart
										size={20}
										className={cn(
											'transition-transform',
											profile?.data.favorites.some(fav => fav.product.id === favorite.product.id) && 'fill-red-500 text-red-500'
										)}
									/>
								</Button>
								<div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
							</div>
							<ProductCardContent className='flex flex-col gap-3 p-4'>
								<div className='space-y-1'>
									<Typography tag='h3' className='font-medium text-gray-900 transition-colors group-hover:text-primary'>
										{favorite.product.title}
									</Typography>
									<Typography tag='span' className='text-sm text-gray-500'>
										{favorite.product.ingredients
											.map(ingredient => ingredient.title)
											.slice(0, 3)
											.join(', ')}
									</Typography>
								</div>
								<div className='flex items-center justify-between'>
									<div className='flex flex-col'>
										<Typography tag='span' className='text-sm font-medium text-primary'>
											{favorite.product.weight} г
										</Typography>
										<Typography tag='span' className='text-lg font-bold text-gray-900'>
											{formatter.number(favorite.product.price, { style: 'currency', currency: 'RUB' })}
										</Typography>
									</div>
									<ProductCardFooter className='p-0'>
										<Button
											onClick={e => {
												e.preventDefault()
												handleAddProduct(favorite.product.id)
											}}
											variant='ghost'
											className='rounded-full bg-primary px-4 text-primary-foreground hover:bg-primary/70'>
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
