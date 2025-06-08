'use client'

import { YandexMap } from '@/components/shared/yandex-map/YandexMap'
import { Typography } from '@/components/ui/common'

import { contactItems } from './contactItems'

export function ContactInfoSection() {
	return (
		<section className='relative overflow-hidden py-20'>
			<div className='absolute inset-0 -z-10'>
				<div className='absolute left-16 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl'></div>
				<div className='bg-primary/3 absolute bottom-20 right-16 h-72 w-72 rounded-full blur-3xl'></div>
			</div>

			<div className='container mx-auto px-4'>
				<div className='mb-16 text-center'>
					<Typography className='mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary'>
						📞 Как нас найти
					</Typography>
					<Typography tag='h1' className='mb-6 text-4xl font-bold leading-tight lg:text-5xl'>
						Всегда <Typography className='bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>на связи</Typography>
					</Typography>
					<Typography tag='p' className='mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground'>
						Найдите удобный способ связаться с нами или посетите наш ресторан
					</Typography>
				</div>

				<div className='mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
					{contactItems.map((item, index) => (
						<div
							key={index}
							className='group relative'
							style={{
								animationDelay: `${index * 100}ms`
							}}>
							<div className='relative h-full overflow-hidden rounded-2xl border-0 bg-card/50 p-6 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10'>
								<div className='relative z-10 flex flex-col items-center gap-4 text-center'>
									<div className='relative'>
										<div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/30 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/25'>
											<item.icon className='h-8 w-8 text-primary transition-all duration-500 group-hover:scale-110' />
										</div>

										<div className='absolute inset-0 rounded-2xl bg-primary/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60'></div>
									</div>

									<Typography className='text-lg font-bold transition-colors duration-300 group-hover:text-primary'>
										{item.title}
									</Typography>

									{item.content && (
										<div className='text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/90'>
											{item.content}
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>

				<div className='relative'>
					<div className='mb-8 text-center'>
						<Typography tag='h3' className='mb-4 text-2xl font-bold'>
							Наше{' '}
							<Typography className='bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
								местоположение
							</Typography>
						</Typography>
						<Typography className='text-muted-foreground'>
							Приходите к нам в гости и насладитесь атмосферой настоящего ресторана
						</Typography>
					</div>

					<div className='relative overflow-hidden rounded-3xl border border-primary/20 shadow-2xl'>
						<div className='absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/10 via-transparent to-primary/10 p-[2px]'>
							<div className='h-full w-full rounded-3xl bg-card'></div>
						</div>

						<div className='relative z-10 overflow-hidden rounded-3xl'>
							<YandexMap readonly initialCoordinates={{ latitude: 59.955687, longitude: 30.307577 }} />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
