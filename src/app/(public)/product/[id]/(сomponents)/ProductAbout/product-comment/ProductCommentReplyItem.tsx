import { motion } from 'framer-motion'
import { useFormatter } from 'next-intl'

import { Typography } from '@/components/ui/common'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/common/Avatar'

import { getMediaSource } from '@/lib/utils'

import { ProductComment } from '@/shared/api/types/product-comment'

interface ReplyItemProps {
	comment: ProductComment
}

export function ProductCommentReplyItem({ comment }: ReplyItemProps) {
	const formatter = useFormatter()

	return (
		<motion.div
			initial={{ opacity: 0, height: 0 }}
			animate={{ opacity: 1, height: 'auto' }}
			exit={{ opacity: 0, height: 0 }}
			transition={{ duration: 0.3 }}
			className='mt-4 space-y-4 border-l-2 border-primary/10 pl-6'>
			{comment.replies.map((reply, replyIndex) => (
				<motion.div
					key={reply.id}
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 20 }}
					transition={{ duration: 0.3, delay: replyIndex * 0.1 }}
					className='rounded-xl bg-primary/[0.02] p-4'>
					<div className='mb-2 flex items-center gap-2'>
						<Avatar className='h-8 w-8 ring-1 ring-primary/10'>
							<AvatarImage src={getMediaSource(reply.account.picture)} />
							<AvatarFallback className='text-xs'>{reply.account.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
						</Avatar>
						<div className='flex flex-col gap-1'>
							<Typography className='text-sm font-semibold'>{reply.account.userName}</Typography>
							<Typography className='text-xs text-muted-foreground'>
								{formatter.dateTime(new Date(reply.createdAt), {
									day: 'numeric',
									month: 'long',
									year: 'numeric'
								})}
							</Typography>
						</div>
					</div>
					<Typography className='text-sm text-neutral-700'>{reply.comment}</Typography>
				</motion.div>
			))}
		</motion.div>
	)
}
