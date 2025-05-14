'use client'

import { AnimatePresence, m, motion } from 'framer-motion'
import { ChevronDown, MessageSquare } from 'lucide-react'
import { useState } from 'react'

import { Button, Typography } from '@/components/ui/common'

import { ProductComment } from '@/shared/api/types/product-comment'

import { ProductCommentItem } from './ProductCommentItem'

interface ProductCommentListProps {
	comments: ProductComment[]
}
const REVIEWS_TO_SHOW = 4

export function ProductCommentList({ comments }: ProductCommentListProps) {
	const [showAll, setShowAll] = useState(false)

	const displayedComments = showAll ? comments : comments?.slice(0, REVIEWS_TO_SHOW)
	const hasMoreComments = comments && comments.length > REVIEWS_TO_SHOW

	if (comments.length === 0) {
		return <ProductCommentListEmpty />
	}

	return (
		<div className='relative space-y-8'>
			<div className='space-y-6'>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className='grid gap-6 md:grid-cols-1 lg:grid-cols-2'>
					<AnimatePresence>
						{displayedComments?.map((comment, index) => (
							<motion.div
								key={comment.id}
								layout
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3, delay: index * 0.1 }}>
								<ProductCommentItem comment={comment} index={index} />
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>

				{hasMoreComments && (
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='flex justify-center'>
						<Button
							variant='outline'
							onClick={() => setShowAll(!showAll)}
							className='group relative gap-2 rounded-full border-primary/20 bg-white px-6 hover:bg-primary/5'>
							{showAll ? 'Свернуть' : `Показать еще ${comments.length - REVIEWS_TO_SHOW} отзывов`}
							<motion.div animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.2 }}>
								<ChevronDown className='h-4 w-4' />
							</motion.div>
						</Button>
					</motion.div>
				)}
			</div>
		</div>
	)
}

export function ProductCommentListEmpty() {
	return (
		<m.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.4 }}
			className='flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed bg-white/50 px-6 py-16 text-center backdrop-blur-sm'>
			<div className='rounded-full bg-primary/5 p-6'>
				<MessageSquare className='h-10 w-10 text-primary/50' />
			</div>
			<div className='flex max-w-sm flex-col space-y-2'>
				<Typography className='text-lg font-medium'>Пока нет отзывов</Typography>
				<Typography className='text-muted-foreground'>Станьте первым, кто поделится своим мнением о товаре!</Typography>
			</div>
		</m.div>
	)
}
