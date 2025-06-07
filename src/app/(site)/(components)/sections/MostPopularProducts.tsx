import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Typography } from '@/components/ui/common/Typography'

import { api } from '@/shared/api/instance'
import { Product } from '@/shared/api/types'
import { getMediaSource } from '@/shared/hooks/helpers'
import { ROUTE } from '@/shared/utils/constants/route'

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

export async function MostPopularProducts() {
	const popularProducts = await getPopularProducts()

	if (popularProducts.length === 0) return null

	return (
		<section className='relative overflow-hidden py-20'>
			<div className='absolute inset-0 -z-10'>
				<div className='absolute left-10 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl'></div>
				<div className='bg-primary/3 absolute bottom-20 right-10 h-96 w-96 rounded-full blur-3xl'></div>
			</div>

			<div className='container mx-auto px-4'>
				<div className='mb-16 text-center'>
					<Typography className='mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary'>
						✨ Популярные блюда
					</Typography>
					<Typography tag='h2' className='mb-6 text-4xl font-bold leading-tight lg:text-5xl'>
						Вкусы, которые{' '}
						<Typography className='bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>покоряют сердца</Typography>
					</Typography>
					<Typography tag='p' className='mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground'>
						Откройте для себя разнообразие нашего меню, от традиционных блюд до современных кулинарных шедевров, которые создают
						незабываемые впечатления
					</Typography>
				</div>

				<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
					{popularProducts.map((product, index) => (
						<Link
							href={ROUTE.product(product.id)}
							key={product.id}
							className='group relative'
							style={{
								animationDelay: `${index * 100}ms`
							}}>
							<div className='relative h-80 overflow-hidden rounded-2xl bg-card shadow-lg transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-primary/10'>
								<div className='relative h-56 overflow-hidden'>
									<Image
										src={getMediaSource(product.imageUrl)}
										alt={product.title}
										fill
										sizes='(max-width: 768px) 100vw, 25vw'
										className='object-cover transition-all duration-700 group-hover:rotate-1 group-hover:scale-110'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40'></div>
								</div>

								<div className='bg-gradient-to-t from-card via-card/95 to-transparent p-3'>
									<Typography
										tag='h3'
										className='mb-3 line-clamp-2 text-xl font-bold leading-tight transition-colors duration-300 group-hover:text-primary'>
										{product.title}
									</Typography>

									<div className='flex items-center justify-between'>
										<Typography className='inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all duration-300 group-hover:gap-3 group-hover:text-primary'>
											Смотреть блюдо
											<ChevronRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
										</Typography>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>

				<div className='mt-16 text-center'>
					<Link
						href={ROUTE.category()}
						className='inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25'>
						Посмотреть всё меню
						<ChevronRight className='h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
					</Link>
				</div>
			</div>
		</section>
	)
}
