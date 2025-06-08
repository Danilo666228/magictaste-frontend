import { ChevronRight, Plus } from 'lucide-react'
import Image from 'next/image'
import { ComponentProps } from 'react'

import { Badge, Button, Popover, PopoverContent, PopoverTrigger, Skeleton, Typography } from '@/components/ui/common'

import { Ingredient } from '@/shared/api/types'
import { getMediaSource } from '@/shared/hooks/helpers'
import { cn } from '@/shared/utils/twMerge'

interface IngredientsProps extends ComponentProps<'div'> {
	selectedIngredients: string[]
	handleClickIngredients: (ingredientId: string) => void
	take: number
	ingredients: Ingredient[]
	isLoading: boolean
}

export function Ingredients({ className, handleClickIngredients, selectedIngredients, take, ingredients, isLoading: isPending }: IngredientsProps) {
	if (isPending) {
		return <IngredientSkeleton />
	}

	if (!ingredients || ingredients.length === 0) {
		return (
			<div className='flex items-center justify-center rounded-lg border border-dashed border-border/50 p-6'>
				<Typography tag='p' className='text-sm text-muted-foreground'>
					Нет доступных ингредиентов для фильтрации
				</Typography>
			</div>
		)
	}

	const visibleIngredients = ingredients.slice(0, take)
	const hiddenIngredients = ingredients.slice(take)

	return (
		<div className={cn('', className)}>
			<div className='flex flex-wrap gap-2'>
				{visibleIngredients.map((ingredient, index) => (
					<Badge
						key={ingredient.id}
						variant={selectedIngredients.includes(ingredient.id) ? 'default' : 'outline'}
						className={cn(
							'group relative h-auto cursor-pointer gap-2 px-3 py-2 transition-all duration-300 hover:scale-105',
							selectedIngredients.includes(ingredient.id)
								? 'border-primary bg-primary/10 text-primary hover:bg-primary/15'
								: 'border-border/50 hover:border-primary/50 hover:bg-primary/5'
						)}
						onClick={() => handleClickIngredients(ingredient.id)}>
						<div className='relative h-5 w-5 flex-shrink-0 overflow-hidden rounded-full shadow-sm ring-2 ring-background'>
							<Image
								alt={ingredient.title}
								fill
								src={getMediaSource(ingredient.imageUrl)}
								className='object-cover transition-transform duration-300 group-hover:scale-110'
							/>
						</div>

						<span className='font-medium'>{ingredient.title}</span>
					</Badge>
				))}
			</div>

			{hiddenIngredients.length > 0 && (
				<Popover modal>
					<PopoverTrigger asChild>
						<Button
							variant='outline'
							size='sm'
							className='group h-9 gap-2 rounded-lg border border-border/50 bg-transparent hover:border-primary/50 hover:bg-primary/5'>
							<Plus size={14} className='text-primary transition-transform group-hover:rotate-90' />
							<span className='text-sm font-medium'>Ещё {hiddenIngredients.length}</span>
							<ChevronRight size={14} className='text-muted-foreground transition-transform duration-300 group-hover:translate-x-1' />
						</Button>
					</PopoverTrigger>

					<PopoverContent className='w-80 p-4' align='start'>
						<div className='space-y-3'>
							<div className='flex items-center gap-2 border-b border-border/50 pb-2'>
								<Typography tag='h4' className='font-semibold text-foreground'>
									Все ингредиенты
								</Typography>
								<Badge variant='secondary' className='text-xs'>
									{ingredients.length}
								</Badge>
							</div>

							<div className='grid max-h-64 grid-cols-2 gap-2 overflow-y-auto'>
								{ingredients.map((ingredient, index) => (
									<Badge
										key={ingredient.id}
										variant={selectedIngredients.includes(ingredient.id) ? 'default' : 'outline'}
										className={cn(
											'group h-auto cursor-pointer gap-2 px-3 py-2 text-left transition-all duration-300',
											selectedIngredients.includes(ingredient.id)
												? 'border-primary bg-primary/10 text-primary'
												: 'border-border/50 hover:border-primary/50 hover:bg-primary/5'
										)}
										onClick={() => handleClickIngredients(ingredient.id)}
										style={{ animationDelay: `${index * 30}ms` }}>
										<div className='relative h-4 w-4 flex-shrink-0 overflow-hidden rounded-full'>
											<Image alt={ingredient.title} fill src={getMediaSource(ingredient.imageUrl)} className='object-cover' />
										</div>

										<span className='truncate text-xs font-medium'>{ingredient.title}</span>
									</Badge>
								))}
							</div>

							{selectedIngredients.length > 0 && (
								<div className='border-t border-border/50 pt-2'>
									<Typography tag='p' className='mb-2 text-xs text-muted-foreground'>
										Выбрано: {selectedIngredients.length} ингредиент(ов)
									</Typography>
									<Button
										variant='outline'
										size='sm'
										onClick={() => selectedIngredients.forEach(id => handleClickIngredients(id))}
										className='h-8 w-full text-xs text-muted-foreground hover:border-destructive/30 hover:text-destructive'>
										Очистить выбор
									</Button>
								</div>
							)}
						</div>
					</PopoverContent>
				</Popover>
			)}
		</div>
	)
}

function IngredientSkeleton() {
	return (
		<div className='flex flex-wrap gap-2'>
			{Array.from({ length: 6 }).map((_, index) => (
				<div key={index} className='flex items-center gap-2 rounded-full border border-border/20 px-3 py-2'>
					<Skeleton className='h-5 w-5 rounded-full' />
					<Skeleton className='h-4 w-16' />
				</div>
			))}
		</div>
	)
}
