import { Loader2 } from 'lucide-react'

import { useProductCommentForm } from '@/app/(site)/product/[id]/(hooks)/useProductCommentForm'

import { Button, Form, FormControl, FormField, FormItem, FormMessage, Textarea } from '@/components/ui/common'
import { Rating } from '@/components/ui/common/Rating'

import { Product } from '@/shared/api/types'

interface ProductCommentFormProps {
	product: Product
	commentId?: string
}

export function ProductCommentForm({ product, commentId }: ProductCommentFormProps) {
	const { form, onSubmit, isPending } = useProductCommentForm({ productId: product.id, commentId })
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<div className='space-y-4'>
					{!commentId && (
						<FormField
							control={form.control}
							name='rating'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className='flex items-center gap-2'>
											<span className='text-sm font-medium'>Ваша оценка:</span>
											<Rating value={field.value ?? 0} onChange={field.onChange} />
										</div>
									</FormControl>
								</FormItem>
							)}
						/>
					)}
					<FormField
						control={form.control}
						name='comment'
						render={({ field }) => (
							<FormItem>
								<FormMessage />
								<FormControl>
									<Textarea
										placeholder='Напишите ваш отзыв здесь...'
										className='z-50 min-h-[120px] resize-none'
										readOnly={isPending}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>

				<div className='flex justify-end'>
					<Button onClick={form.handleSubmit(onSubmit)} disabled={isPending || !form.formState.isDirty} className='min-w-[120px]'>
						{isPending ? (
							<>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Отправка...
							</>
						) : (
							'Сохранить'
						)}
					</Button>
				</div>
			</form>
		</Form>
	)
}
