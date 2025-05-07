import { Clock, Package, ShoppingBag, User } from 'lucide-react'
import { useFormatter } from 'next-intl'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Skeleton
} from '@/components/ui/common'

import { DashboardStatisticsData } from '@/shared/api/types/statistics'

import { getMediaSource } from '@/lib/utils/getMediaSource'

interface ChartLastOrdersProps {
	isLoading: boolean
	recentPurchases: DashboardStatisticsData['recentPurchases']
}

export function ChartLastOrders({ isLoading, recentPurchases }: ChartLastOrdersProps) {
	const format = useFormatter()
	return (
		<Card className='overflow-hidden border-none shadow-md transition-shadow duration-300 hover:shadow-lg'>
			<CardHeader className='bg-gradient-to-r from-indigo-500/10 to-purple-500/10 pb-8'>
				<div className='flex items-center justify-between'>
					<div>
						<CardTitle className='text-lg font-semibold'>Последние заказы</CardTitle>
						<CardDescription className='text-sm opacity-80'>Недавно оформленные заказы</CardDescription>
					</div>
					<ShoppingBag className='h-5 w-5 text-primary' />
				</div>
			</CardHeader>
			<CardContent className='p-5'>
				{isLoading ? (
					<div className='space-y-4'>
						{[1, 2, 3, 4].map(i => (
							<div key={i} className='flex gap-4'>
								<Skeleton className='h-16 w-16 rounded-lg' />
								<div className='flex-1 space-y-2'>
									<Skeleton className='h-4 w-full' />
									<Skeleton className='h-4 w-3/4' />
									<Skeleton className='h-4 w-1/2' />
								</div>
							</div>
						))}
					</div>
				) : (
					<div className='space-y-6'>
						{recentPurchases?.map(purchase => (
							<div
								key={purchase.orderId}
								className='flex gap-4 rounded-lg p-3 transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-900'>
								{purchase.mainProduct?.image ? (
									<div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg shadow-sm'>
										<img
											src={getMediaSource(purchase.mainProduct.image)}
											alt={purchase.mainProduct.title}
											className='h-full w-full object-cover transition-transform duration-300 hover:scale-110'
										/>
									</div>
								) : (
									<div className='flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800'>
										<ShoppingBag className='h-6 w-6 text-primary/70' />
									</div>
								)}
								<div className='flex-1'>
									<div className='flex items-center justify-between'>
										<p className='text-sm font-medium'>Заказ #{purchase.orderId.substring(0, 8)}</p>
										<Badge variant='outline' className='border-primary/20 bg-primary/5 text-xs'>
											{format.number(purchase.orderTotal)}
										</Badge>
									</div>
									<div className='mt-1 flex items-center gap-1 text-xs text-muted-foreground'>
										<Clock className='h-3 w-3' />
										<span>{format.dateTime(new Date(purchase.orderDate))}</span>
									</div>
									<div className='mt-2 flex items-center'>
										<Avatar className='h-6 w-6 ring-1 ring-primary/10'>
											<AvatarImage src={getMediaSource(purchase.user.picture)} />
											<AvatarFallback className='bg-primary/10 text-primary'>
												{purchase.user.userName.substring(0, 2).toUpperCase()}
											</AvatarFallback>
										</Avatar>
										<p className='ml-2 flex items-center gap-1 text-xs'>
											<User className='h-3 w-3 text-muted-foreground' />
											{purchase.user.userName}
										</p>
									</div>
									{purchase.additionalProductsCount > 0 && (
										<Badge variant='outline' className='mt-2 flex items-center gap-1 bg-slate-50 text-xs dark:bg-slate-800'>
											<Package className='h-3 w-3' />+{purchase.additionalProductsCount} товаров
										</Badge>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	)
}
