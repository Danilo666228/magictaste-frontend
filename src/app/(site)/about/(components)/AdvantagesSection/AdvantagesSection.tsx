import Image from 'next/image'

import { Typography } from '@/components/ui/common'

import { sectionDetails } from './advatagesDetails'

export function AdvantagesSection() {
	return (
		<section className='relative overflow-hidden py-20'>
			<div className='absolute inset-0 -z-10'>
				<div className='bg-primary/4 absolute right-10 top-32 h-96 w-96 rounded-full blur-3xl'></div>
				<div className='bg-primary/6 absolute bottom-32 left-10 h-80 w-80 rounded-full blur-3xl'></div>
				<div className='bg-primary/3 absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform rounded-full blur-3xl'></div>
			</div>

			<div className='container mx-auto px-4'>
				<div className='mb-16 text-center'>
					<Typography className='mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary'>
						⭐ Наши особенности
					</Typography>
					<Typography tag='h1' className='mb-6 text-4xl font-bold leading-tight lg:text-5xl'>
						Почему выбирают{' '}
						<Typography className='bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>именно нас</Typography>
					</Typography>
					<Typography tag='p' className='mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground'>
						Каждая деталь нашего сервиса создана для того, чтобы ваш опыт был незабываемым
					</Typography>
				</div>

				<div className='grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-4'>
					{sectionDetails.map((section, index) => (
						<div
							key={section.id}
							className='group relative mx-auto max-w-[560px]'
							style={{
								animationDelay: `${index * 150}ms`
							}}>
							<div className='relative h-full overflow-hidden rounded-3xl border-0 bg-card/50 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/10'>
								<div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

								<div className='relative h-80 overflow-hidden'>
									<Image
										alt={section.title}
										src={section.img}
										className='object-cover transition-all duration-700 group-hover:rotate-1 group-hover:scale-110'
										fill
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40'></div>

									<div className='absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary shadow-lg backdrop-blur-sm'>
										#{section.id}
									</div>
								</div>

								<div className='relative z-10 p-6'>
									<Typography className='mb-3 line-clamp-2 text-xl font-bold transition-colors duration-300 group-hover:text-primary'>
										{section.title}
									</Typography>

									<div className='mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-primary/50 transition-all duration-500 group-hover:w-20'></div>

									<Typography className='leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/90'>
										{section.description}
									</Typography>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className='mt-16 text-center'>
					<div className='mx-auto max-w-4xl rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-8 backdrop-blur-sm'>
						<Typography tag='p' className='mb-4 text-lg font-medium text-foreground/90'>
							Убедитесь сами в качестве нашего сервиса
						</Typography>
						<Typography className='text-sm text-muted-foreground'>Приходите к нам и почувствуйте разницу</Typography>
					</div>
				</div>
			</div>
		</section>
	)
}
