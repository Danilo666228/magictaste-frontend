import { Clock, LucideIcon, Star, Utensils } from 'lucide-react'

import { Badge, Card, CardContent, CardHeader, Typography } from '@/components/ui/common'

interface CardInfo {
	id: number
	title: string
	description: string
	icon: LucideIcon
}

const cardInfo: CardInfo[] = [
	{
		id: 1,
		title: 'Авторская кухня',
		description: 'Наши шеф-повара создают уникальные блюда, сочетая традиционные рецепты и современные техники',
		icon: Utensils
	},
	{
		id: 2,
		title: 'Высокое качество',
		description: 'Мы используем только свежие и натуральные продукты от проверенных поставщиков',
		icon: Star
	},
	{
		id: 3,
		title: 'Быстрая доставка',
		description: 'Доставляем ваш заказ в течение 60 минут или возвращаем деньги',
		icon: Clock
	}
]

export function BenefitsSection() {
	return (
		<section className='relative py-20'>
			<div className='container mx-auto'>
				<div className='mb-16 text-center'>
					<Badge className='mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20'>
						🏆 Наши преимущества
					</Badge>
					<Typography tag='h1' className='mb-6 text-4xl font-bold leading-tight lg:text-5xl'>
						Почему выбирают{' '}
						<Typography className='bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>именно нас</Typography>
					</Typography>
					<Typography tag='p' className='mx-auto text-lg leading-relaxed text-muted-foreground'>
						Мы создаем не просто еду — мы создаем впечатления, которые остаются с вами надолго
					</Typography>
				</div>

				<div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
					{cardInfo.map(card => (
						<div key={card.id} className='group relative'>
							<Card className='relative h-full overflow-hidden border-0 bg-card/50 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10'>
								<CardHeader className='relative z-10 pb-4'>
									<div className='flex items-start gap-4'>
										<div className='relative'>
											<div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/30 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/25'>
												<card.icon className='h-8 w-8 text-primary transition-all duration-500 group-hover:scale-110' />
											</div>
										</div>

										<div className='flex-1'>
											<Typography
												tag='h3'
												className='mb-2 text-xl font-bold transition-colors duration-300 group-hover:text-primary'>
												{card.title}
											</Typography>

											<div className='h-1 w-12 rounded-full bg-gradient-to-r from-primary to-primary/50 transition-all duration-500 group-hover:w-20' />
										</div>
									</div>
								</CardHeader>

								<CardContent className='relative z-10 pt-0'>
									<Typography
										tag='p'
										className='leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/90'>
										{card.description}
									</Typography>
								</CardContent>
							</Card>
						</div>
					))}
				</div>

				<div className='mt-16 text-center'>
					<div className='mx-auto max-w-4xl rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-8 backdrop-blur-sm'>
						<Typography tag='p' className='mb-4 flex items-center justify-center gap-2 text-lg font-medium text-foreground/90'>
							<Typography>Более</Typography>
							<Typography className='text-2xl font-bold text-primary'>5000+</Typography>
							<Typography>довольных клиентов на всё время нашей работы</Typography>
						</Typography>
						<div className='flex items-center justify-center gap-1'>
							{[...Array(5)].map((_, i) => (
								<Star key={i} className='h-5 w-5 fill-yellow-400 text-yellow-400 transition-transform duration-300 hover:scale-125' />
							))}
							<Typography className='ml-2 text-sm font-medium text-muted-foreground'>4.9 из 5.0 звезд</Typography>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
