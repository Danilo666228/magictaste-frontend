'use client'

import { AnimatePresence } from 'framer-motion'
import { MessageSquare } from 'lucide-react'
import { useState } from 'react'

import { Button, Typography } from '@/components/ui/common'
import { FormModal } from '@/components/ui/elements/modal/FormModal/FormModal'

import { useAuth } from '@/hooks/useAuth'

import { Product } from '@/shared/api/types'

import { useProductComments } from '../../../(hooks)/useProductComment'

import { ProductCommentForm } from './ProductCommentForm'
import { ProductCommentList } from './ProductCommentList'
import { ProductCommentStatistic } from './ProductCommentStatistic'

interface ProductCommentsProps {
	product: Product
}

export function ProductComments({ product }: ProductCommentsProps) {
	const { isAuth } = useAuth()
	const [isOpen, setIsOpen] = useState(false)
	const { comments, getAverageRating, getRatingDistribution } = useProductComments({ productId: product.id, includeReplies: true })

	return (
		<section className='relative space-y-8'>
			<div className='flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between'>
				<div className='space-y-2'>
					<Typography tag='h2' className='text-2xl font-semibold'>
						Отзывы о товаре
					</Typography>
				</div>

				{isAuth && (
					<FormModal
						title='Добавление отзыва'
						description='Поделитесь своим мнением о товаре'
						renderForm={() => <ProductCommentForm product={product} />}
						trigger={
							<Button>
								<MessageSquare className='h-4 w-4' />
								Написать отзыв
							</Button>
						}
						isOpen={isOpen}
						onOpenChange={setIsOpen}
					/>
				)}
			</div>

			<AnimatePresence mode='popLayout'>
				<ProductCommentStatistic
					key={'comment-statistic'}
					comments={comments}
					averageRating={getAverageRating(comments)}
					ratingDistribution={getRatingDistribution(comments)}
				/>
				<ProductCommentList key={'comment-list'} comments={comments} />
			</AnimatePresence>
		</section>
	)
}
