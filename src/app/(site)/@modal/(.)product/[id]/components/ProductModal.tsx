'use client'

import { Heart } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { IngredientList } from '@/app/(site)/product/(components)/IngredientList'

import { Button, Dialog, DialogContent, DialogDescription, DialogTitle, Typography } from '@/components/ui/common'

import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { useProfile } from '@/hooks/useProfile'

import { useToggleFavoriteMutation } from '@/shared/api/hooks/favorite/useToggleFavoriteMutation'
import { Product } from '@/shared/api/types'

import { ROUTE } from '@/config/route.config'
import { cn, getMediaSource } from '@/lib/utils'
import { isActiveFavorite } from '@/lib/utils/favorite/is-active-favorite'

interface ProductModalProps {
	product: Product
}

export function ProductModal({ product }: ProductModalProps) {
	const router = useRouter()
	const { profile, refetch } = useProfile()
	const { mutate: toggleFavorite } = useToggleFavoriteMutation({
		options: {
			onSuccess: () => refetch()
		}
	})
	const { addProduct } = useCart()
	const { isAuth } = useAuth()

	const handleClickAddInCart = () => {
		if (!isAuth) router.push(ROUTE.auth.signIn)
		addProduct({ params: { productId: product.id } })
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
			<DialogContent className='p-2 sm:p-6 lg:min-w-[64rem]'>
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
					<div className='group relative aspect-[4/3] w-full rounded-lg bg-muted sm:aspect-square'>
						<Image
							src={getMediaSource(product.imageUrl)}
							className='object-contain transition-transform duration-300 group-hover:scale-105'
							alt={product.title}
							fill
							sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
						/>
					</div>
					<div className='flex flex-col justify-between gap-3 p-2 sm:p-4'>
						<div>
							<DialogTitle>
								<Typography className='text-xl sm:text-2xl'>{product.title}</Typography>
							</DialogTitle>
							<DialogDescription>
								<Typography className='text-sm sm:text-base'>{product.description}</Typography>
							</DialogDescription>
						</div>
						{product.ingredients && <IngredientList className='max-w-full' ingredients={product.ingredients} />}
						<div className='mt-auto flex flex-col items-stretch gap-3 sm:flex-row sm:items-center'>
							<Button onClick={handleClickAddInCart} className='w-full'>
								В корзину
							</Button>
							<Button
								onClick={handleClickAddFavorite}
								variant='outline'
								className={cn(
									'group h-9 w-full hover:bg-red-300/20 sm:w-12',
									isActiveFavorite(profile?.data, product) && 'bg-red-300/20'
								)}
								size='icon'>
								<Heart className={cn('group-hover:text-red-500', isActiveFavorite(profile?.data, product) && 'text-red-500')} />
							</Button>
						</div>
						<div className='flex flex-col justify-between gap-3 sm:flex-row sm:gap-10'>
							<Button
								variant='link'
								className='w-full sm:w-auto'
								onClick={() => {
									window.location.href = ROUTE.product(product.id)
								}}>
								Подробнее
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
