'use client'


import { MessageSquare } from 'lucide-react'
import { useState } from 'react'

import { Button, Typography } from '@/components/ui/common'


import { useAuth } from '@/hooks/useAuth'

import { Product } from '@/shared/api/types'

import { useProductComments } from '../../../(hooks)/useProductComment'

import { ProductCommentForm } from './ProductCommentForm'
import { ProductCommentList } from './ProductCommentList'

import { Modal } from '@/components/ui/elements/modal/Default/Modal'
import { AnimatePresence } from 'framer-motion'
import {
	ProductCommentStatistic
} from '@/app/(public)/product/[id]/(сomponents)/ProductAbout/product-comment/ProductCommentStatistic'

interface ProductCommentsProps {
	product: Product
}

export function ProductComments({ product }: ProductCommentsProps) {
	const { isAuth } = useAuth()
	const [isOpen, setIsOpen] = useState(false)
	const { comments, getAverageRating, getRatingDistribution } = useProductComments(product.id)

	return (
		<section className="relative space-y-8">
			<div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
				<div className="space-y-2">
					<Typography tag="h2" className="text-2xl font-semibold">
						Отзывы о товаре
					</Typography>
				</div>

				{isAuth && (
					<Modal title={'Добавить отзыв'}
								 trigger={
									 <Button>
										 <MessageSquare className="h-4 w-4" />
										 Написать отзыв
									 </Button>}
								 open={isOpen}
								 onOpenChange={setIsOpen}>
						<ProductCommentForm product={product} />
					</Modal>
				)}
			</div>

			<AnimatePresence mode="popLayout">
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
