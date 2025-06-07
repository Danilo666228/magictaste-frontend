'use client'

import { Typography } from '@/components/ui/common'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/common/Сarousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

const AUTOPLAY_DELAY = 5000

export function HeroCarousel() {
	return (
		<section className='mt-4 h-[400px] overflow-hidden rounded-3xl sm:mx-6 lg:mx-8'>
			<Carousel
				className={'h-[400px] w-full'}
				plugins={[
					Autoplay({
						delay: AUTOPLAY_DELAY,
						stopOnInteraction: true
					})
				]}>
				<CarouselContent>
					<CarouselItem>
						<div className={'relative h-[600px] w-full'}>
							<Image src={'/carousel/1.jpg'} alt={'Классические пельмени ручной работы'} fill priority className='object-cover' />
							<div className='absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40' />
							<div className={'absolute right-[20%] top-[20%] flex max-w-lg flex-col space-y-4'}>
								<Typography className={'text-4xl font-bold leading-tight text-white md:text-5xl'} tag={'h1'}>
									Классические пельмени
								</Typography>
								<Typography className={'text-lg font-light text-white/90 md:text-xl'} tag={'p'}>
									Традиционный рецепт с говядиной и свининой, тонкое тесто ручной работы
								</Typography>
							</div>
						</div>
					</CarouselItem>

					<CarouselItem>
						<div className={'relative h-[700px] w-full'}>
							<Image src={'/carousel/2.webp'} alt={'Пельмени на пару в бамбуковой пароварке'} fill className='object-cover' />
							<div className='absolute inset-0 bg-gradient-to-l from-black/50 via-transparent to-black/60' />
							<div className={'absolute left-[50px] top-[20%] flex max-w-lg flex-col space-y-4 text-right'}>
								<Typography className={'text-4xl font-bold leading-tight text-white md:text-5xl'} tag={'h1'}>
									Пельмени на пару
								</Typography>
								<Typography className={'text-lg font-light text-white/90 md:text-xl'} tag={'p'}>
									Деликатный способ приготовления для сохранения всех вкусов и ароматов
								</Typography>
							</div>
						</div>
					</CarouselItem>

					<CarouselItem>
						<div className={'relative h-[700px] w-full'}>
							<Image src={'/carousel/3.jpg'} alt={'Жареные пельмени с золотистой корочкой'} fill className='object-cover' />
							<div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30' />
							<div className={'absolute left-1/2 top-[30%] flex max-w-2xl -translate-x-1/2 transform flex-col space-y-4 text-center'}>
								<Typography className={'text-4xl font-bold leading-tight text-white md:text-5xl'} tag={'h1'}>
									Жареные пельмени
								</Typography>
								<Typography className={'text-lg font-light text-white/90 md:text-xl'} tag={'p'}>
									Хрустящая золотистая корочка и сочная начинка внутри
								</Typography>
							</div>
						</div>
					</CarouselItem>
				</CarouselContent>
				<CarouselPrevious className='left-4 top-[50%] border-white/30 bg-white/20 text-white backdrop-blur-md hover:bg-white/40' />
				<CarouselNext className='right-4 top-[50%] border-white/30 bg-white/20 text-white backdrop-blur-md hover:bg-white/40' />
			</Carousel>
		</section>
	)
}
