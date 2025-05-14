import { Clock, LucideIcon, Star, Utensils } from 'lucide-react'

import { Card, CardContent, CardHeader, Typography } from '@/components/ui/common'

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
		<section className='py-12'>
			<div className='px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
					{cardInfo.map(card => (
						<Card key={card.id} className='group border-2 shadow transition-colors duration-300 hover:border-primary'>
							<CardHeader className='flex flex-row items-center gap-3'>
								<div className='flex size-10 items-center justify-center rounded-full bg-primary/30'>
									<card.icon className='text-primary' size={26} />
								</div>
								<Typography tag='h3' className='font-bold group-hover:text-primary'>
									{card.title}
								</Typography>
							</CardHeader>
							<CardContent>
								<Typography tag='p' className=''>
									{card.description}
								</Typography>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
