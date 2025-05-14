import { m } from 'framer-motion'
import { Star } from 'lucide-react'

import { Typography } from '@/components/ui/common'

import { ProductComment } from '@/shared/api/types/product-comment'

interface ProductCommentStatisticProps {
	comments: ProductComment[]
	averageRating: number
	ratingDistribution: Record<number, number>
}

export function ProductCommentStatistic({ comments, averageRating, ratingDistribution }: ProductCommentStatisticProps) {
	const commentsText = comments.length === 1 ? 'отзыв' : comments.length >= 2 && comments.length <= 4 ? 'отзыва' : 'отзывов'

	return (
		comments.length > 0 && (
			<m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='overflow-hidden rounded-2xl backdrop-blur-sm'>
				<div className='grid gap-6 p-6 md:grid-cols-2'>
					<div className='flex items-center gap-6'>
						<div className='text-center'>
							<div className='text-5xl font-bold text-primary'>{averageRating.toFixed(1)}</div>
							<div className='mt-1 flex items-center gap-1'>
								{Array.from({ length: 5 }).map((_, i) => (
									<Star
										key={i}
										className={`h-4 w-4 ${i < Math.round(averageRating) ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
									/>
								))}
							</div>
							<Typography className='mt-2 text-sm text-muted-foreground'>
								{comments.length} {commentsText}
							</Typography>
						</div>

						<div className='flex-1 space-y-2'>
							{[5, 4, 3, 2, 1].map(rating => (
								<div key={rating} className='flex items-center gap-2 text-sm'>
									<div className='w-12 text-muted-foreground'>{rating} звезд</div>
									<div className='h-2 flex-1 overflow-hidden rounded-full bg-muted'>
										<m.div
											initial={{ width: 0 }}
											animate={{
												width: `${((ratingDistribution[rating] || 0) / comments.length) * 100}%`
											}}
											transition={{ duration: 0.5, delay: rating * 0.1 }}
											className='h-full bg-primary'
										/>
									</div>
									<div className='w-8 text-right text-muted-foreground'>{ratingDistribution[rating] || 0}</div>
								</div>
							))}
						</div>
					</div>

					<div className='flex flex-col justify-center gap-2 rounded-xl bg-primary/5 p-6'>
						<Typography className='text-lg font-medium'>Общая статистика</Typography>
						<div className='space-y-1'>
							<div className='flex items-center justify-between'>
								<span className='text-sm text-muted-foreground'>Всего отзывов</span>
								<span className='font-medium'>{comments.length}</span>
							</div>
							<div className='flex items-center justify-between'>
								<span className='text-sm text-muted-foreground'>Средняя оценка</span>
								<span className='font-medium'>{averageRating.toFixed(1)}</span>
							</div>
							<div className='flex items-center justify-between'>
								<span className='text-sm text-muted-foreground'>Последний отзыв</span>
								<span className='font-medium'>{new Date(comments[0]?.createdAt).toLocaleDateString()}</span>
							</div>
						</div>
					</div>
				</div>
			</m.div>
		)
	)
}
