'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger, Typography } from '@/components/ui/common'

import { useGetCategoryQuery } from '@/shared/api/hooks/category/useGetCategoryQuery'
import { cn } from '@/shared/hooks/helpers'
import { ROUTE } from '@/shared/utils/constants/route'

export function NavigationCatalog() {
	const { data: categories } = useGetCategoryQuery()
	const pathname = usePathname()
	const isActive = pathname.startsWith('/category')
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger>
				<Link
					className={cn(
						'block rounded-lg px-3 py-2 transition-all duration-300',
						'relative transform-gpu overflow-hidden',
						'hover:bg-primary/5',
						'before:absolute before:inset-0 before:bg-primary/0 before:transition-colors before:duration-300',
						'hover:before:bg-primary/20'
					)}
					href={ROUTE.category()}>
					<span className='relative z-10 font-medium'>Меню</span>
					<div className={cn('absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300', isActive ? 'w-full' : 'w-0')} />
				</Link>
			</NavigationMenuTrigger>
			<NavigationMenuContent>
				<div className='w-[650px] p-6'>
					<div className='mb-4'>
						<Typography tag='h3' className='text-xl font-semibold tracking-tight'>
							Категории
						</Typography>
						<Typography className='mt-1 text-sm text-muted-foreground'>Выберите категорию блюд из нашего меню</Typography>
					</div>
					<ul className='grid grid-cols-3 gap-4'>
						{categories?.data?.categories.map(
							category =>
								category.products &&
								category.products?.length > 0 && (
									<li key={category.id}>
										<Link
											href={ROUTE.category(category.title)}
											className={cn(
												'flex items-center justify-between rounded-lg border p-2 ring-offset-background transition-all duration-300 hover:border-ring hover:shadow-md hover:ring-primary'
											)}>
											<Typography tag='span'>{category.title}</Typography>
											<Typography className='flex size-7 items-center justify-center rounded-full bg-primary' tag='span'>
												{category.products?.length}
											</Typography>
										</Link>
									</li>
								)
						)}
					</ul>
				</div>
			</NavigationMenuContent>
		</NavigationMenuItem>
	)
}
