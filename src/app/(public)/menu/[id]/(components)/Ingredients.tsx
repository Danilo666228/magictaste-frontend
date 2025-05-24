import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { ComponentProps } from 'react'

import { Badge, Button, Popover, PopoverContent, PopoverTrigger, Skeleton } from '@/components/ui/common'

import { getMediaSource } from '@/lib/utils'
import { cn } from '@/lib/utils/twMerge'

import { Ingredient } from '@/shared/api/types'

interface IngredientsProps extends ComponentProps<'div'> {
	selectedIngredients: string[]
	handleClickIngredients: (ingredientId: string) => void
	take: number
	ingredients: Ingredient[]
	isPending: boolean
}

export function Ingredients({ className, handleClickIngredients, selectedIngredients, take, ingredients, isPending }: IngredientsProps) {
	if (isPending) {
		return <IngredientSkeleton />
	}

	if (!ingredients || ingredients.length === 0) {
		return null
	}

	return (
		<div className={cn('flex flex-wrap items-center gap-3 w-fit', className)}>
			<div className='flex flex-wrap gap-2'>
				{ingredients.slice(0, take).map(ingredient => (
					<Badge
						key={ingredient.id}
						variant={'outline'}
						className={cn('h-auto cursor-pointer gap-2 px-3 py-2', selectedIngredients.includes(ingredient.id) && 'border-primary')}
						onClick={() => handleClickIngredients(ingredient.id)}>
						<div className='relative h-5 w-5 flex-shrink-0 overflow-hidden rounded-full'>
							<Image alt={ingredient.title} fill src={getMediaSource(ingredient.imageUrl)} className='object-cover' />
						</div>
						{ingredient.title}
					</Badge>
				))}
			</div>

			{ingredients.length > take && (
				<Popover modal>
					<PopoverTrigger asChild>
						<Button variant='outline' className='group gap-1'>
							Ещё <ChevronRight size={14} className='duration-300 group-hover:translate-x-1' />
						</Button>
					</PopoverTrigger>
					<PopoverContent className='p-3'>
						<div className='grid grid-cols-2 gap-2'>
							{ingredients.map(ingredient => (
								<Badge
									key={ingredient.id}
									variant={'outline'}
									className={cn(
										'h-auto cursor-pointer gap-2 px-3 py-2',
										selectedIngredients.includes(ingredient.id) && 'border-primary'
									)}
									onClick={() => handleClickIngredients(ingredient.id)}>
									<div className='relative h-5 w-5 flex-shrink-0 overflow-hidden rounded-full'>
										<Image alt={ingredient.title} fill src={getMediaSource(ingredient.imageUrl)} className='object-cover' />
									</div>
									{ingredient.title}
								</Badge>
							))}
						</div>
					</PopoverContent>
				</Popover>
			)}
		</div>
	)
}

export function IngredientSkeleton() {
	return (
		<div className='flex flex-wrap items-center gap-2'>
			<Skeleton className='h-4 w-24' />
			{Array.from({ length: 5 }, (_, index) => (
				<Skeleton key={index} className='h-8 w-24 rounded-full' />
			))}
		</div>
	)
}
