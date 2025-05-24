'use client'

import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

import { Typography } from '@/components/ui/common'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/common/Сarousel'

import { API_URL } from '@/lib/constants/url.constants'

const AUTOPLAY_DELAY = 5000

export function HeroCarousel() {
	console.log('@API URL = ', API_URL)
	return (
		<section className='mt-4 h-[400px] overflow-hidden rounded-3xl sm:mx-6 lg:mx-8'>
			<Carousel
				className={'h-[300px] w-full'}
				plugins={[
					Autoplay({
						delay: AUTOPLAY_DELAY,
						stopOnInteraction: true
					})
				]}>
				<CarouselContent>
					<CarouselItem>
						<div className={'relative h-[700px] w-full'}>
							<Image src={'/carousel/34962.jpg'} alt={'Традиционные пельмени ручной работы'} fill priority className='object-cover' />
							<div className={'absolute right-[130px] top-[20%] flex flex-col'}>
								<Typography className={'font-bold text-background'} tag={'h1'}>
									Самые вкусные пельмени
								</Typography>
							</div>
						</div>
					</CarouselItem>
					<CarouselItem>
						<div className={'relative h-[700px] w-full'}>
							<Image
								src={'/carousel/taylor-kiser-6RJct18G_3I-unsplash.jpg'}
								alt={'Традиционные пельмени ручной работы'}
								fill
								priority
								className='object-cover'
							/>
							<div className={'absolute left-[200px] top-[20%]'}></div>
						</div>
					</CarouselItem>
				</CarouselContent>
				<CarouselPrevious className='left-2 top-[70%] bg-white/30 backdrop-blur-sm hover:bg-white/50' />
				<CarouselNext className='right-2 top-[70%] bg-white/30 backdrop-blur-sm hover:bg-white/50' />
			</Carousel>
		</section>
	)
}
