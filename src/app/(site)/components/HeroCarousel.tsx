'use client'

import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/common/Сarousel'

const AUTOPLAY_DELAY = 5000

export function HeroCarousel() {
	return (
		<div className='relative h-[400px] w-full overflow-hidden md:h-[700px]'>
			<Carousel
				plugins={[
					Autoplay({
						delay: AUTOPLAY_DELAY,
						stopOnInteraction: true
					})
				]}>
				<CarouselContent>
					<CarouselItem>
						<div className='relative h-[700px] w-full'>
							<Image
								src={'/carousel/pelmeni.jpg'}
								alt={'Традиционные пельмени ручной работы'}
								fill
								priority
								className='object-cover'
							/>
						</div>
					</CarouselItem>
					<CarouselItem>
						<div className='relative h-[700px] w-full'>
							<Image
								src={'/carousel/taylor-kiser-6RJct18G_3I-unsplash.jpg'}
								alt={'Традиционные пельмени ручной работы'}
								fill
								priority
								className='object-cover'
							/>
						</div>
					</CarouselItem>
				</CarouselContent>
				<CarouselPrevious className='left-2 top-1/3 bg-white/30 backdrop-blur-sm hover:bg-white/50 s' />
				<CarouselNext className='right-2 top-1/3 bg-white/30 backdrop-blur-sm hover:bg-white/50' />
			</Carousel>
		</div>
	)
}
