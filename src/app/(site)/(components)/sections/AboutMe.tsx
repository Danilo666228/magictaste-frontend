import { Clock, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'

import { Badge, Typography } from '@/components/ui/common'

const contacts = [
	{ icon: MapPin, label: 'Адрес', value: 'ул. Маркина 7' },
	{ icon: Phone, label: 'Телефон', value: '+7 (123) 456-78-90' },
	{ icon: Clock, label: 'Режим работы', value: '10:00 - 22:00' }
]
const benefits = [
	{ value: '14+', label: 'лет опыта' },
	{ value: '50k+', label: 'довольных гостей' },
	{ value: '50+', label: 'блюд в меню' }
]

export function AboutMe() {
	return (
		<section className='relative overflow-hidden py-20'>
			<div className='container mx-auto'>
				<div className='mb-16 text-center'>
					<Badge className='mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20'>
						🏛️ Наша история
					</Badge>
					<Typography tag='h2' className='mb-6 text-4xl font-bold leading-tight lg:text-5xl'>
						О нашем {''}
						<Typography className='bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>ресторане</Typography>
					</Typography>
				</div>

				<div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
					<div className='group relative'>
						<div className='group-hover:shadow-3xl relative h-[500px] overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 group-hover:shadow-primary/20'>
							<Image
								src='/about.webp'
								sizes='(max-width: 768px) 100vw, 50vw'
								alt='О нашем ресторане'
								fill
								className='object-cover transition-all duration-700 group-hover:scale-105'
							/>

							<div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent'></div>

							<div className='absolute bottom-6 left-6 rounded-2xl bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm'>
								<Typography className='text-sm font-semibold text-primary'>С 2010 года</Typography>
							</div>
						</div>

						<div className='absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-xl'></div>
						<div className='absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-primary/5 blur-2xl'></div>
					</div>

					<div className='space-y-8'>
						<div className='space-y-6'>
							<Typography tag='p' className='text-lg leading-relaxed text-muted-foreground'>
								Наш ресторан был основан в 2010 году с простой идеей: создать место, где каждый гость почувствует себя особенным. Мы
								стремимся предложить не просто еду, а настоящее{' '}
								<span className='font-semibold text-primary'>гастрономическое путешествие</span>.
							</Typography>

							<Typography tag='p' className='text-lg leading-relaxed text-muted-foreground'>
								Наша команда профессиональных поваров постоянно совершенствует меню, добавляя новые блюда и улучшая классические
								рецепты. Мы гордимся тем, что используем только{' '}
								<span className='font-semibold text-primary'>свежие и качественные ингредиенты</span>.
							</Typography>
						</div>

						<div className='space-y-4'>
							{contacts.map((item, index) => (
								<div
									key={index}
									className='group flex items-center gap-4 rounded-2xl border border-transparent bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-card/80'>
									<div className='flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/30 transition-transform duration-300 group-hover:scale-110'>
										<item.icon className='h-5 w-5 text-primary' />
									</div>
									<div className='flex flex-1 items-center gap-3'>
										<Typography className='text-sm font-medium text-muted-foreground'>{item.label}</Typography>
										<Typography className='font-semibold transition-colors duration-300 group-hover:text-primary'>
											{item.value}
										</Typography>
									</div>
								</div>
							))}
						</div>

						<div className='mt-8 grid grid-cols-3 gap-4'>
							{benefits.map((stat, index) => (
								<div
									key={index}
									className='flex items-center justify-center gap-3 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-4 text-center'>
									<Typography className='text-2xl font-bold text-primary'>{stat.value}</Typography>
									<Typography className='text-sm text-muted-foreground'>{stat.label}</Typography>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
