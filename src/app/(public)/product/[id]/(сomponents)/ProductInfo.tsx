'use client'

import { ChevronDown, Heart, Minus, Plus, Share2, ShoppingCart } from 'lucide-react'
import { useFormatter } from 'next-intl'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button, Container, Typography } from '@/components/ui/common'

import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { useFavorite } from '@/hooks/useFavorite'
import { useProfile } from '@/hooks/useProfile'

import { cn, getMediaSource } from '@/lib/utils'
import { isActiveFavorite } from '@/lib/utils/favorite/is-active-favorite'

import { Product } from '@/shared/api/types'
import { useShare } from '@/shared/hooks'

import { IngredientList } from '../../(components)/IngredientList'

interface ProductInfoProps {
	product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
	const formatted = useFormatter()
	const { isAuth } = useAuth()
	const { profile } = useProfile()
	const { handleAddProduct } = useCart()
	const { toggleFavorite } = useFavorite()
	const [quantity, setQuantity] = useState(1)
	const [showFullDescription, setShowFullDescription] = useState(false)
	const { share } = useShare()
	const pathname = usePathname()

	const increaseQuantity = () => setQuantity(prev => prev + 1)
	const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [])

	return (
		<Container className='mx-auto my-12 max-w-7xl'>
			<div className='overflow-hidden rounded-3xl bg-background shadow-xl'>
				<div className='grid grid-cols-1 gap-8 p-6 md:grid-cols-2 md:p-8 lg:grid-cols-[1fr_1.5fr]'>
					<div className='space-y-6'>
						<div className='group relative aspect-square overflow-hidden rounded-2xl bg-gray-50'>
							<Image
								src={getMediaSource(product.imageUrl)}
								alt={product.title}
								priority
								fill
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								className='object-contain p-6 transition-transform duration-500 group-hover:scale-105'
							/>
						</div>
					</div>

					<div className='flex flex-col'>
						<div className='mb-6'>
							<div className='mb-2 flex items-start justify-between'>
								<Typography tag='h1' className='text-3xl font-bold tracking-tight text-gray-900 md:text-4xl'>
									{product.title}
								</Typography>
								<button
									onClick={() => share({ title: 'MagicTaste', text: 'ОП', url: pathname })}
									className='rounded-full p-2 transition-colors hover:bg-gray-100'
									aria-label='Поделиться'>
									<Share2 className='h-5 w-5 text-gray-500' />
								</button>
							</div>
							<Typography tag='h3' className='mb-4 text-lg font-medium text-primary'>
								Вес: {product.weight} г.
							</Typography>

							<div className='mb-6'>
								<Typography className={`leading-relaxed text-gray-700 ${!showFullDescription && 'line-clamp-3'}`}>
									{product.description ||
										'Нежное и ароматное блюдо, приготовленное по традиционному рецепту нашего шеф-повара. Идеально подходит для особых случаев и повседневных трапез.'}
								</Typography>
								{(product.description?.length || 0) > 150 && (
									<Button
										onClick={() => setShowFullDescription(!showFullDescription)}
										className='mt-2 flex items-center text-sm font-medium text-primary hover:text-primary/80'>
										{showFullDescription ? 'Скрыть' : 'Читать далее'}
										<ChevronDown
											className={`ml-1 h-4 w-4 transition-transform ${showFullDescription ? 'rotate-180' : ''}`}
										/>
									</Button>
								)}
							</div>

							{product.ingredients.length > 0 && (
								<div className='mb-6'>
									<Typography tag='h3' className='mb-3 text-lg font-semibold'>
										Ингредиенты
									</Typography>
									<IngredientList className='min-w-full' ingredients={product.ingredients} />
								</div>
							)}
						</div>

						<div className='mt-auto space-y-6'>
							<div className='flex items-end justify-between'>
								<div>
									<Typography className='mb-1 text-sm text-gray-500'>Цена</Typography>
									<Typography tag='h2' className='text-3xl font-bold text-gray-900'>
										{formatted.number(product.price, { style: 'currency', currency: 'RUB' })}
									</Typography>
								</div>

								<div className='flex items-center overflow-hidden rounded-full border border-gray-200'>
									<Button
										variant={'outline'}
										onClick={decreaseQuantity}
										className='flex h-10 w-10 items-center justify-center border-none text-gray-500 transition-colors hover:bg-gray-100'
										disabled={quantity <= 1}>
										<Minus />
									</Button>
									<span className='w-10 text-center font-medium'>{quantity}</span>
									<Button
										variant={'outline'}
										onClick={increaseQuantity}
										className='flex h-10 w-10 items-center justify-center border-none text-gray-500 transition-colors hover:bg-gray-100'>
										<Plus />
									</Button>
								</div>
							</div>

							<div className='flex gap-4'>
								<Button
									disabled={!isAuth}
									onClick={() => handleAddProduct(product.id, quantity)}
									className='active:scale-98 flex-1 bg-primary py-3 text-white transition-transform hover:bg-primary/80'>
									В корзину
									<ShoppingCart className='ml-2 h-5 w-5' />
								</Button>

								<Button
									disabled={!isAuth}
									onClick={() => toggleFavorite(product.id)}
									variant='outline'
									className={cn(
										'dark:hover:bg-rose-950/30) aspect-square p-0 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500',
										isActiveFavorite(profile?.data, product) && 'bg-rose-50 text-rose-500'
									)}>
									<Heart className='h-5 w-5' />
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}
