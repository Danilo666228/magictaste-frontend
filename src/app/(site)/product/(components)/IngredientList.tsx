'use client'

import Autoplay from 'embla-carousel-autoplay'
import { ComponentProps } from 'react'

import { Typography } from '@/components/ui/common'
import { Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/common/Сarousel'

import { Ingredient } from '@/shared/api/types'

import { IngredientItem } from './IngredientItem'
import { cn } from '@/lib/utils'

interface IngredientItemProps extends ComponentProps<'section'> {
	ingredients: Ingredient[]
}

const AUTOPLAY_DELAY = 3000

export function IngredientList({ ingredients, className }: IngredientItemProps) {
	if (!ingredients.length) return null

	return (
		<section className={cn('flex max-w-[400px] flex-col gap-2', className)}>
			<Typography tag='span' className='text-sm'>
				Состав:
			</Typography>

			<Carousel
				plugins={[
					Autoplay({
						delay: AUTOPLAY_DELAY,
						stopOnInteraction: false
					})
				]}
				opts={{
					align: 'start',
					loop: true,
					dragFree: true,
					slidesToScroll: 1
				}}
				className='w-full'>
				<CarouselContent className='my-2 -ml-2'>
					{ingredients.map(ingredient => (
						<CarouselItem
							key={ingredient.id}
							className={`pl-2 ${
								ingredients.length === 1 ? 'basis-full' : ingredients.length === 2 ? 'basis-1/2' : 'basis-1/3'
							} max-w-[100px]`}>
							<div className='h-full max-w-[100px]'>
								<IngredientItem ingredient={ingredient} />
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				{ingredients.length > 3 && (
					<>
						<CarouselPrevious className='-left-1 hidden sm:flex' />
						<CarouselNext className='-right-1 hidden sm:flex' />
						<CarouselDots />
					</>
				)}
			</Carousel>
		</section>
	)
}
