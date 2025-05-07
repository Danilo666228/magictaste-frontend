import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { Button, Typography } from '@/components/ui/common'

import { Category } from '@/shared/api/types/category'

import { ProductList } from '../ProductList'

import { ROUTE } from '@/config/route.config'

interface CategoryItemProps {
	category: Category
}

export function CategoryItem({ category }: CategoryItemProps) {
	return (
		<div className='mb-16'>
			<div className='mb-8 border-b pb-4'>
				<div className='flex items-center justify-between'>
					<div>
						<Typography tag='h2' className='text-2xl font-bold text-foreground'>
							{category.title}
						</Typography>
						<Typography tag='p' className='mt-1 text-muted-foreground'>
							{category.products?.length} блюд
						</Typography>
					</div>

					<Link href={ROUTE.menu(category.id)}>
						<Button variant='outline' className='group'>
							Показать все <ChevronRight className='transition-transform duration-300 group-hover:translate-x-1' size={16} />
						</Button>
					</Link>
				</div>
			</div>
			<ProductList take={5} products={category.products} />
		</div>
	)
}
