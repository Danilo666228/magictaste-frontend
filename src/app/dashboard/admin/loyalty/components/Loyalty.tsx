'use client'

import { CarouselLotalty } from './CarouselLotalty'
import { LoyaltyForm } from './LoyaltyForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/common'

export function Loyalty() {
	return (
		<div className='grid grid-cols-2 gap-5'>
			<Card className='h-fit'>
				<CardHeader className='bg-muted/50 text-2xl'>
					<CardTitle>Добавить уровень лояльности</CardTitle>
				</CardHeader>
				<CardContent className='pt-4'>
					<LoyaltyForm />
				</CardContent>
			</Card>
			<CarouselLotalty />
		</div>
	)
}
