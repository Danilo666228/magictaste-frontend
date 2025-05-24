'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger, Typography } from '@/components/ui/common'

import { cn } from '@/lib/utils'

import { useGetCategoryQuery } from '@/shared/api/hooks/category/useGetCategoryQuery'

import { ROUTE } from '@/config/route.config'

export function NavigationCatalog() {
	const { data: categories } = useGetCategoryQuery()
	const pathname = usePathname()
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger>
				<Link
					className={cn(
						'relative rounded p-1 transition-all duration-300',
						'after:absolute after:bottom-[-4px] after:left-1/2 after:h-0.5 after:origin-center after:bg-primary after:transition-all after:duration-300',
						pathname.startsWith('/menu') ? 'after:left-0 after:w-full' : 'after:w-0',
						'hover:after:left-0 hover:after:w-full'
					)}
					href={ROUTE.menu()}>
					Меню
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
											href={ROUTE.menu(category.id)}
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
