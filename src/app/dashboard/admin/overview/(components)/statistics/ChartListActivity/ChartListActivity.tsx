import { Star } from 'lucide-react'
import { useFormatter } from 'next-intl'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	ScrollArea
} from '@/components/ui/common'

import { DashboardStatisticsData } from '@/shared/api/types/statistics'

import { cn, getMediaSource } from '@/lib/utils'

interface ChartListActivityProps {
	activityFeed: DashboardStatisticsData['activityFeed']
}

export function ChartListActivity({ activityFeed }: ChartListActivityProps) {
	const format = useFormatter()
	return (
		<Card className='h-[600px]'>
			<CardHeader>
				<CardTitle>Лента активности</CardTitle>
				<CardDescription>Последние действия в магазине</CardDescription>
			</CardHeader>
			<ScrollArea className='h-[calc(100%-110px)]'>
				<CardContent className='p-0'>
					<ul className='space-y-6 p-4'>
						{activityFeed.map((activity, index) => (
							<li key={index} className='flex gap-4'>
								<Avatar>
									<AvatarImage src={getMediaSource(activity.user.picture)} />
									<AvatarFallback>{activity.user.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
								</Avatar>
								<div>
									<p className='text-sm'>
										<span className='font-medium'>{activity.user.userName}</span>{' '}
										{activity.type === 'PURCHASE' && (
											<>
												совершил покупку на сумму{' '}
												<span className='font-medium'>{format.number(activity.orderTotal || 0)}</span>
											</>
										)}
										{activity.type === 'NEW_USER' && 'зарегистрировался в магазине'}
										{activity.type === 'REVIEW' && (
											<>
												оставил отзыв на товар <span className='font-medium'>{activity.product?.title}</span>
											</>
										)}
									</p>
									<p className='text-xs text-muted-foreground'>{format.dateTime(new Date(activity.date))}</p>
									{activity.type === 'REVIEW' && activity.rating && (
										<div className='mt-1 flex items-center'>
											{Array.from({ length: 5 }).map((_, i) => (
												<Star
													key={i}
													className={cn(
														'h-4 w-4',
														i < activity.rating! ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground'
													)}
												/>
											))}
											{activity.comment && (
												<p className='ml-2 text-xs italic'>"{activity.comment.substring(0, 50)}..."</p>
											)}
										</div>
									)}
								</div>
							</li>
						))}
					</ul>
				</CardContent>
			</ScrollArea>
		</Card>
	)
}
