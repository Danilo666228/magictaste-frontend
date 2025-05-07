import { ChevronRight } from 'lucide-react'
import Image from 'next/image'

import { Badge, Button, Container, Popover, PopoverContent, PopoverTrigger, Skeleton } from '@/components/ui/common'

import { useGetIngredientByCategoryQuery } from '@/shared/api/hooks/ingredient/useGetIngredientByCategoryQuery'

import { getMediaSource } from '@/lib/utils'
import { cn } from '@/lib/utils/twMerge'

interface IngredientsProps {
	categoryId: string
	className?: string
	selectedIngredients: string[]
	handleClickIngredients: (ingredientId: string) => void
}

export function Ingredients({ className, categoryId, handleClickIngredients, selectedIngredients }: IngredientsProps) {
	const { data: ingredients, isPending } = useGetIngredientByCategoryQuery({
		categoryId
	})

	if (isPending) {
		return <IngredientSkeleton />
	}

	if (!ingredients?.data || ingredients.data.length === 0) {
		return null
	}

	return (
		<Container className={cn('flex flex-wrap items-center gap-2', className)}>
			<div className='mr-2 text-sm font-medium text-gray-700'>Ингредиенты:</div>

			<div className='flex flex-wrap gap-2'>
				{ingredients.data.slice(0, 4).map(ingredient => (
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

			{ingredients.data.length > 4 && (
				<Popover>
					<PopoverTrigger asChild>
						<Button variant='outline' size='sm' className='ml-1 gap-1'>
							Ещё <ChevronRight size={14} />
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-[300px] p-3'>
						<div className='grid grid-cols-2 gap-2'>
							{ingredients.data.map(ingredient => (
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
		</Container>
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
