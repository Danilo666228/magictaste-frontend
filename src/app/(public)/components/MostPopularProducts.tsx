import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/ui/common/Container'
import { Typography } from '@/components/ui/common/Typography'

import { getMediaSource } from '@/lib/utils'

import { api } from '@/shared/api/instance'
import { Product } from '@/shared/api/types'

import { ROUTE } from '@/config/route.config'

async function getPopularProducts() {
	try {
		const response = await api.get<Product[]>('/products/most-popular', {
			next: {
				revalidate: 60
			},
			params: {
				limit: 4
			}
		})
		return response.data
	} catch (error) {
		return []
	}
}

export const CAROUSEL_ITEMS = [
	{ title: 'Самые вкусные блюда у нас', description: 'Закажите наши блюда', image: '/carousel/pelmeni.jpg' },
	{ title: 'Самые лучшие работники у нас', description: 'Приходите к нам', image: '/carousel/taylor-kiser-6RJct18G_3I-unsplash.jpg' }
]

export async function MostPopularProducts() {
	const popularProducts = await getPopularProducts()

	if (popularProducts.length === 0) return null

	return (
		<section className='py-16'>
			<Container className='px-4 sm:px-6 lg:px-8'>
				<div className='mb-12 text-center'>
					<Typography tag='h2' className='mb-4 text-3xl font-bold'>
						Популярные блюда
					</Typography>
					<Typography tag='p' className='mx-auto max-w-2xl'>
						Откройте для себя разнообразие нашего меню, от традиционных блюд до современных кулинарных шедевров
					</Typography>
				</div>

				<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
					{popularProducts.map(product => (
						<Link href={ROUTE.product(product.id)} key={product.id} className='group'>
							<div className='relative h-64 overflow-hidden rounded-xl'>
								<Image
									src={getMediaSource(product.imageUrl)}
									alt={product.title}
									fill
									sizes='(max-width: 768px) 100vw, 33vw'
									className='object-contain transition-transform duration-300 group-hover:scale-105'
								/>
								<div className='absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent'>
									<div className='w-full p-4'>
										<h3 className='mb-2 text-xl font-semibold text-primary-foreground transition-colors group-hover:text-primary'>
											{product.title}
										</h3>
										<span className='inline-flex items-center text-sm text-primary-foreground/90 transition-colors group-hover:text-primary'>
											Смотреть блюдо <ChevronRight className='ml-1 h-4 w-4' />
										</span>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</Container>
		</section>
	)
}
