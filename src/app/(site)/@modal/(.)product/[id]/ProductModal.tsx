'use client'

import { useQueryClient } from '@tanstack/react-query'
import { Eye, Heart, ShoppingCart, Sparkles, Star } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { IngredientList } from '@/app/(site)/product/(components)/IngredientList'

import { Button, Dialog, DialogContent, DialogDescription, DialogTitle, Typography } from '@/components/ui/common'

import { useCart } from '@/hooks/useCart'

import { isActiveFavorite } from '@/shared/api/helpers/is-active-favorite'
import { useToggleFavoriteMutation } from '@/shared/api/hooks/favorite/useToggleFavoriteMutation'
import { Product } from '@/shared/api/types'
import { cn, getMediaSource } from '@/shared/hooks/helpers'
import { ROUTE } from '@/shared/utils/constants/route'
import { useProfile } from '@/shared/utils/contexts'

interface ProductModalProps {
	product: Product
}

export function ProductModal({ product }: ProductModalProps) {
	const queryClient = useQueryClient()
	const router = useRouter()
	const { profile, isAuth } = useProfile()
	const { mutate: toggleFavorite } = useToggleFavoriteMutation({
		options: {
			onSettled: () => queryClient.invalidateQueries({ queryKey: ['getProfile'] })
		}
	})
	const { handleAddProduct } = useCart()

	const handleClickAddInCart = () => {
		if (!isAuth) router.push(ROUTE.auth.signIn)
		handleAddProduct(product.id)
	}
	const handleClickAddFavorite = () => {
		toggleFavorite({
			config: {
				params: { productId: product.id }
			}
		})
	}

	return (
		<Dialog defaultOpen onOpenChange={() => router.back()}>
			<DialogContent className='max-w-5xl overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 p-0'>
				<div className='relative overflow-hidden rounded-t-lg bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6'>
					<div className='flex items-center gap-3'>
						<div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 backdrop-blur-sm'>
							<Sparkles className='h-6 w-6 text-primary' />
						</div>
						<div className='flex flex-col gap-2'>
							<Typography className='text-lg font-bold text-primary'>Быстрый просмотр</Typography>
							<Typography className='text-sm text-muted-foreground'>Детали блюда</Typography>
						</div>
					</div>
					<div className='absolute -right-10 -top-10 h-20 w-20 rounded-full bg-primary/10 blur-2xl' />
				</div>

				<div className='p-6'>
					<div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
						<div className='relative space-y-4'>
							<div className='group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-muted/50 to-muted shadow-xl'>
								<div className='absolute right-4 top-4 z-10'>
									<div className='flex items-center gap-2 rounded-full bg-background/90 px-3 py-2 shadow-lg backdrop-blur-sm'>
										<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
										<Typography className='text-sm font-medium'>4.8</Typography>
									</div>
								</div>

								<Image
									src={getMediaSource(product.imageUrl)}
									className='object-cover transition-all duration-500 group-hover:scale-110'
									alt={product.title}
									fill
									sizes='(max-width: 1024px) 100vw, 50vw'
								/>
							</div>
						</div>

						<div className='flex flex-col space-y-6'>
							<div className='space-y-4'>
								<DialogTitle>
									<Typography className='bg-gradient-to-r from-foreground to-primary bg-clip-text text-3xl font-bold leading-tight text-transparent'>
										{product.title}
									</Typography>
								</DialogTitle>
								<DialogDescription>
									<Typography className='text-base leading-relaxed text-muted-foreground'>{product.description}</Typography>
								</DialogDescription>
							</div>

							{product.ingredients && (
								<div className='space-y-3'>
									<Typography className='flex items-center gap-2 font-semibold text-foreground'>
										<Sparkles className='h-4 w-4 text-primary' />
										Состав блюда
									</Typography>
									<IngredientList className='max-w-full' ingredients={product.ingredients} />
								</div>
							)}

							<div className='rounded-xl bg-primary/5 p-4'>
								<div className='flex items-center justify-between gap-2'>
									<Typography className='text-sm text-muted-foreground'>Цена</Typography>
									<Typography className='text-2xl font-bold text-primary'>{product.price} ₽</Typography>
								</div>
							</div>

							<div className='space-y-4'>
								<div className='flex gap-3'>
									<Button
										onClick={handleClickAddInCart}
										className='h-12 flex-1 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30'>
										<ShoppingCart className='mr-2 h-5 w-5' />В корзину
									</Button>
									<Button
										onClick={handleClickAddFavorite}
										variant='outline'
										className={cn(
											'h-12 w-12 rounded-xl border-2 transition-all duration-300',
											isActiveFavorite(profile, product)
												? 'border-red-200 bg-red-50 hover:bg-red-100'
												: 'border-border hover:border-red-200 hover:bg-red-50'
										)}
										size='icon'>
										<Heart
											className={cn(
												'h-5 w-5 transition-all duration-300',
												isActiveFavorite(profile, product)
													? 'scale-110 fill-red-500 text-red-500'
													: 'text-muted-foreground hover:text-red-500'
											)}
										/>
									</Button>
								</div>

								<Button
									variant='ghost'
									className='h-10 w-full rounded-xl text-primary hover:bg-primary/5'
									onClick={() => {
										window.location.href = ROUTE.product(product.id)
									}}>
									<Eye className='mr-2 h-4 w-4' />
									Подробная страница
								</Button>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
