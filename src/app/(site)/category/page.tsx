import { Metadata } from 'next'

import { Badge, Typography } from '@/components/ui/common'

import { CategoryList } from './(components)/CategoryList/CategoryList'

export const metadata: Metadata = {
	title: 'Меню'
}

const benefits = [
	{
		icon: '✨',
		title: 'Свежие ингредиенты',
		value: '50+'
	},
	{
		icon: '👨‍🍳',
		title: ' Авторские рецепты',
		value: '15'
	},
	{
		icon: '🌿',
		title: 'Сезонные блюда',
		value: '100%'
	},
	{
		icon: '🏆',
		title: 'Премиум качество',
		value: '4.9'
	}
]

const statistics = [
	{
		icon: '🍽️',
		title: 'Вкусных блюд',
		value: '50+'
	},
	{
		icon: '🌿',
		title: 'Свежих продуктов',
		value: '100%'
	},
	{
		icon: '🏆',
		title: 'Рейтинг гостей',
		value: '4.9'
	}
]

export default async function CategoryPage() {
	return (
		<div className='-mx-[70px]'>
			<div className='bg-gradient-to-r from-amber-500 to-orange-500 text-background'>
				<div className='px-4 py-16 text-center sm:px-6 md:py-24 lg:px-8'>
					<Typography
						tag='h1'
						className='mb-6 bg-gradient-to-b from-white to-white/80 bg-clip-text text-5xl font-bold text-transparent md:text-6xl lg:text-7xl'>
						Наше меню
					</Typography>

					<Typography tag='p' className='mx-auto mb-8 text-sm leading-relaxed opacity-90 md:text-base'>
						Откройте для себя уникальную коллекцию блюд, созданных с душой и мастерством наших поваров
					</Typography>

					<div className='mb-8 flex flex-wrap justify-center gap-3'>
						{benefits.map(benefit => (
							<Badge
								key={benefit.title}
								className='flex items-center gap-2 rounded-full border border-white/20 bg-white/20 px-4 py-2 text-sm backdrop-blur-sm transition-all duration-300 hover:bg-white/30'>
								{benefit.icon}
								<Typography>{benefit.title}</Typography>
							</Badge>
						))}
					</div>

					<div className='mx-auto grid max-w-2xl grid-cols-3 gap-6'>
						{statistics.map(stat => (
							<div key={stat.title} className='text-center'>
								<div className='mb-1 text-3xl font-bold'>{stat.value}</div>
								<div className='text-sm opacity-80'>{stat.title}</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className='-mt-8 px-4 sm:px-6 lg:px-8'>
				<div className='rounded-lg border border-border/50 bg-card p-6 shadow-xl md:p-8'>
					<CategoryList />
				</div>
			</div>
		</div>
	)
}
