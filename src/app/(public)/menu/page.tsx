import { Utensils } from 'lucide-react'

import { Typography } from '@/components/ui/common'

import { CategoryList } from './(components)/CategoryList/CategoryList'
import { Metadata } from 'next'

export const metadata : Metadata = {
	title: 'Меню',
}

export default async function MenuPage() {
	return (
		<div>
			<div className='bg-gradient-to-r from-amber-500 to-orange-500 text-background'>
				<div className='px-4 py-16 sm:px-6 md:py-24 lg:px-8'>
					<div className='mx-auto max-w-4xl text-center'>
						<div className='mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm'>
							<Utensils className='h-8 w-8' />
						</div>
						<Typography tag='h1' className='mb-4 text-4xl font-bold md:text-5xl'>
							Наше меню
						</Typography>
						<Typography tag='p' className='mb-6 text-xl opacity-90'>
							Откройте для себя разнообразие вкусов в нашем тщательно подобранном меню
						</Typography>
						<div className='flex flex-wrap justify-center gap-4 text-sm'>
							<span className='rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm'>Свежие ингредиенты</span>
							<span className='rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm'>Авторские рецепты</span>
							<span className='rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm'>Сезонные блюда</span>
						</div>
					</div>
				</div>
			</div>

			<div className='-mt-8 px-4 sm:px-6 lg:px-8'>
				<div className='rounded-lg bg-muted p-6 shadow-xl md:p-8'>
					<CategoryList />
				</div>
			</div>
		</div>
	)
}
