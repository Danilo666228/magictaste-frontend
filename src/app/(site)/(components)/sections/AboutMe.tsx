import { Clock, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'

import { Typography } from '@/components/ui/common'

export function AboutMe() {
	return (
		<section className='my-10'>
			<div className='grid grid-cols-1 items-center gap-10 lg:grid-cols-2'>
				<div className='relative h-[400px] overflow-hidden rounded-xl'>
					<Image src='/about.webp' sizes='(max-width: 768px) 100vw, 33vw' alt='О нашем ресторане' fill className='object-cover' />
				</div>
				<div>
					<Typography tag='h2' className='mb-4 text-3xl font-bold'>
						О нашем ресторане
					</Typography>
					<Typography tag='p' className='mb-6'>
						Наш ресторан был основан в 2010 году с простой идеей: создать место, где каждый гость почувствует себя особенным. Мы стремимся
						предложить не просто еду, а настоящее гастрономическое путешествие.
					</Typography>
					<Typography tag='p' className='mb-6'>
						Наша команда профессиональных поваров постоянно совершенствует меню, добавляя новые блюда и улучшая классические рецепты. Мы
						гордимся тем, что используем только свежие и качественные ингредиенты.
					</Typography>
					<div className='ml-auto flex flex-col items-center gap-4 sm:flex-row'>
						<div className='flex items-center gap-2'>
							<MapPin className='h-5 w-5 text-primary' />
							<Typography>ул. Ресторанная, 123</Typography>
						</div>
						<div className='flex items-center gap-2'>
							<Phone className='h-5 w-5 text-primary' />
							<Typography>+7 (123) 456-78-90</Typography>
						</div>
						<div className='flex items-center gap-2'>
							<Clock className='h-5 w-5 text-primary' />
							<Typography>10:00 - 22:00</Typography>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
