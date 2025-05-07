'use client'

import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Ellipsis, MessageCircle, Star, Trash } from 'lucide-react'
import { useFormatter } from 'next-intl'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage, Button, Popover, PopoverContent, PopoverTrigger, Typography } from '@/components/ui/common'
import { FormModal } from '@/components/ui/elements/modal/FormModal/FormModal'

import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'

import { ProductComment } from '@/shared/api/types/product-comment'

import { useProductComments } from '../../../(hooks)/useProductComment'

import { ProductCommentForm } from './ProductCommentForm'
import { ProductCommentReplyItem } from './ProductCommentReplyItem'
import { getMediaSource } from '@/lib/utils'


interface ProductCommentItemProps {
	comment: ProductComment
	index: number
}

export function ProductCommentItem({ comment, index }: ProductCommentItemProps) {
	const { profile } = useProfile()
	const formatter = useFormatter()
	const { removeComment } = useProductComments({ productId: comment.product.id, includeReplies: true })
	const { isAuth } = useAuth()

	const [isShowReplyComment, setIsShowReplyComment] = useState(false)
	const [isOpenReplyForm, setIsOpenReplyForm] = useState(false)

	const handleDeleteProductComment = () => {
		removeComment(comment.id)
	}

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: index * 0.1 }}
				className='group relative overflow-hidden rounded-2xl bg-muted/30 p-6 shadow-md'>
				<div className='absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

				<div className='relative space-y-4'>
					<div className='flex items-start justify-between'>
						<div className='flex gap-4'>
							<Avatar className='h-12 w-12 ring-2 ring-primary/10 ring-offset-2 transition-all duration-300 group-hover:ring-primary/30'>
								<AvatarImage src={getMediaSource(comment.account.picture)} />
								<AvatarFallback className='bg-primary/5 text-sm font-medium'>
									{comment.account.userName.slice(0, 2).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className='space-y-1'>
								<Typography className='font-semibold'>{comment.account.userName}</Typography>
								<div className='flex items-center gap-2'>
									<div className='flex items-center'>
										{Array.from({ length: 5 }).map((_, i) => (
											<Star
												key={i}
												className={`h-4 w-4 ${i < comment.rating ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
											/>
										))}
									</div>
									<span className='text-sm font-medium text-primary'>{comment.rating.toFixed(1)}</span>
								</div>
							</div>
						</div>
						{comment.account.id === profile?.data.id && (
							<Popover>
								<PopoverTrigger asChild>
									<Button variant='ghost' size='icon'>
										<Ellipsis className='h-4 w-4' />
									</Button>
								</PopoverTrigger>
								<PopoverContent className='flex w-fit flex-col gap-2'>
									<Button variant={'outline'} onClick={handleDeleteProductComment}>
										<Trash className='h-4 w-4' />
										Удалить
									</Button>
								</PopoverContent>
							</Popover>
						)}
					</div>

					<div className='relative rounded-xl bg-primary/[0.02] p-4'>
						<Typography className='break-words text-base leading-relaxed text-neutral-700'>{comment.comment}</Typography>
					</div>

					<div className='flex items-center justify-between pt-2'>
						<div className='flex items-center gap-4'>
							{comment?.replies?.length > 0 && (
								<Button onClick={() => setIsShowReplyComment(prev => !prev)} variant={'outline'}>
									Ещё {comment.replies.length} ответ(ов)
									{isShowReplyComment ? <ChevronUp className='h-4 w-4' /> : <ChevronDown className='h-4 w-4' />}
								</Button>
							)}
							{isAuth && (
								<Button
									variant={'outline'}
									onClick={() => setIsOpenReplyForm(true)}
									className='flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted'>
									<MessageCircle className='h-4 w-4' />
									Комментировать
								</Button>
							)}
						</div>
						<Typography className='text-sm text-muted-foreground'>
							{formatter.dateTime(new Date(comment.createdAt), {
								day: 'numeric',
								month: 'long',
								year: 'numeric',
								hour: 'numeric',
								minute: 'numeric'
							})}
						</Typography>
					</div>

					{isShowReplyComment && comment.replies && <ProductCommentReplyItem comment={comment} />}
				</div>
			</motion.div>

			<FormModal
				title='Ответить на комментарий'
				renderForm={() => <ProductCommentForm product={comment.product} commentId={comment.id} />}
				isOpen={isOpenReplyForm}
				onOpenChange={setIsOpenReplyForm}
			/>
		</>
	)
}
