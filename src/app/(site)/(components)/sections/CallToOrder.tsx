import Link from 'next/link'

import { Button, Typography } from '@/components/ui/common'

import { ROUTE } from '@/shared/utils/constants/route'

export const CallToOrder = () => {
	return (
		<section className='relative overflow-hidden py-20'>
			<div className='absolute inset-0 -z-10'>
				<div className='bg-primary/8 absolute left-1/4 top-10 h-64 w-64 animate-pulse rounded-full blur-3xl'></div>
				<div
					className='bg-primary/6 absolute bottom-10 right-1/4 h-80 w-80 animate-pulse rounded-full blur-3xl'
					style={{ animationDelay: '1s' }}></div>
				<div className='bg-primary/4 absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl'></div>
			</div>

			<div className='container mx-auto px-4'>
				<div className='relative'>
					<div className='relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card/80 to-card/40 p-12 text-center shadow-2xl shadow-primary/10 backdrop-blur-lg'>
						<div className='absolute inset-0 opacity-5'>
							<div className='absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_1px_1px,_hsl(var(--primary))_1px,_transparent_0)] bg-[length:20px_20px]'></div>
						</div>

						<div className='relative z-10'>
							<div className='mb-8 inline-flex items-center gap-2 rounded-full bg-primary/15 px-6 py-3 text-sm font-medium text-primary backdrop-blur-sm'>
								🍽️ Время заказать
							</div>

							<Typography tag='h2' className='mb-6 text-4xl font-bold leading-tight lg:text-5xl'>
								Готовы попробовать{' '}
								<Typography className='bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
									наши блюда?
								</Typography>
							</Typography>

							<Typography tag='p' className='mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground'>
								Закажите доставку и насладитесь <span className='font-semibold text-primary'>изысканными блюдами</span> нашего
								ресторана прямо у себя дома
							</Typography>

							<div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
								<Link href={ROUTE.category()}>
									<Button
										size='lg'
										variant='default'
										className='group relative overflow-hidden bg-gradient-to-r from-primary to-primary/90 px-8 py-4 text-lg shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30'>
										<span className='relative z-10 flex items-center gap-2'>🛒 Заказать доставку</span>
									</Button>
								</Link>
							</div>

							<div className='mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3'>
								{[
									{ icon: '⚡', number: '30', label: 'минут доставка', suffix: 'мин' },
									{ icon: '⭐', number: '4.9', label: 'рейтинг доставки', suffix: '/5' },
									{ icon: '📦', number: '1000+', label: 'заказов в месяц', suffix: '+' }
								].map((stat, index) => (
									<div
										key={index}
										className='group rounded-2xl border border-primary/10 bg-card/30 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-card/50'>
										<div className='mb-3 text-2xl'>{stat.icon}</div>
										<div className='mb-2 flex items-baseline justify-center gap-1'>
											<Typography className='text-2xl font-bold text-primary transition-transform duration-300 group-hover:scale-110'>
												{stat.number}
											</Typography>
											<Typography className='text-sm text-primary/70'>{stat.suffix}</Typography>
										</div>
										<Typography className='text-sm text-muted-foreground'>{stat.label}</Typography>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
