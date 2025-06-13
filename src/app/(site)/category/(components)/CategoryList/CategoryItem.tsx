import { ChevronRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

import { Button, Typography } from '@/components/ui/common'

import { Category } from '@/shared/api/types/category'
import { ROUTE } from '@/shared/utils/constants/route'

import { ProductList } from '../ProductList'

interface CategoryItemProps {
	category: Category
}

export function CategoryItem({ category }: CategoryItemProps) {
	return (
		<div className='relative mb-20'>
			<div className='relative mb-12'>
				<div className='mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm'>
					<Sparkles size={16} className='animate-pulse' />
					Категория блюд
				</div>

				<div className='mb-8 rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm'>
					<div className='flex items-center justify-between'>
						<div className='space-y-2'>
							<Typography tag='h2' className='text-3xl font-bold'>
								<span className='bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
									{category.title}
								</span>
							</Typography>
							<div className='flex items-center gap-4'>
								<Typography tag='p' className='text-muted-foreground'>
									<span className='font-semibold text-primary'>{category.products?.length}</span> вкусных блюд
								</Typography>
							</div>
						</div>

						<Link href={ROUTE.category(category.title)}>
							<Button className='group relative overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/25'>
								<Typography className='relative'>Показать все</Typography>
								<ChevronRight className='relative ml-2 transition-transform duration-300 group-hover:translate-x-1' size={16} />
							</Button>
						</Link>
					</div>
				</div>
			</div>

			<ProductList take={5} className='' products={category.products} />
		</div>
	)
}
