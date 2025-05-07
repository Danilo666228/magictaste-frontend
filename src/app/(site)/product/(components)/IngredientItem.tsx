import Image from 'next/image'

import { Card, CardContent, Typography } from '@/components/ui/common'

import { Ingredient } from '@/shared/api/types'

import { getMediaSource } from '@/lib/utils'

interface IngredientItemProps {
	ingredient: Ingredient
}

export function IngredientItem({ ingredient }: IngredientItemProps) {
	return (
		<Card className='h-full overflow-hidden border border-border/50 transition-all hover:border-border hover:shadow-sm'>
			<CardContent className='flex flex-col items-center p-3 text-center'>
				<div className='relative mb-2 h-12 w-12 shrink-0 overflow-hidden rounded-full'>
					<Image src={getMediaSource(ingredient.imageUrl)} alt={ingredient.title} fill sizes='48px' className='object-contain p-2' />
				</div>
				<Typography className='line-clamp-2 text-xs font-medium'>{ingredient.title}</Typography>
			</CardContent>
		</Card>
	)
}
