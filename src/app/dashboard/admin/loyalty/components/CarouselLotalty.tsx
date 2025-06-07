'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/common/Сarousel'

import { useGetLoyaltyLevelsQuery } from '@/shared/api/hooks/loyalty/useGetLotaltyLevelsQuery'

import { LoyaltyLevelCard } from './LoyaltyLevelCard'

export function CarouselLotalty() {
	const { data: levels } = useGetLoyaltyLevelsQuery()

	return (
		<Carousel className='max-w-xl justify-self-center'>
			<CarouselContent>
				{levels?.data.map(level => (
					<CarouselItem key={level.id}>
						<LoyaltyLevelCard loyaltyLevel={level} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className='-left-10' />
			<CarouselNext className='-right-10' />
		</Carousel>
	)
}
