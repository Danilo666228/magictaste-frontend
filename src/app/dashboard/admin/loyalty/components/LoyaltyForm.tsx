'use client'

import { ComponentProps } from 'react'
import { useForm } from 'react-hook-form'

import { Button, Card, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui/common'

import { LoyaltySchema } from '@/schemas/loyalty/lotalty'

interface LoyaltyFormProps extends ComponentProps<typeof Card> {
	initialDate?: LoyaltySchema
}

export function LoyaltyForm({ initialDate, ...props }: LoyaltyFormProps) {
	const form = useForm<LoyaltySchema>({
		defaultValues: {
			title: initialDate?.title || '',
			minPoints: initialDate?.minPoints || 0,
			percent: initialDate?.percent || 0
		}
	})

	const onSubmit = (data: LoyaltySchema) => {
		console.log(data)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='flex flex-col gap-3'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Название уровня</FormLabel>
								<FormControl>
									<Input type='text' placeholder='Бронза' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex justify-between gap-3'>
						<FormField
							control={form.control}
							name='minPoints'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Мин. количество баллов</FormLabel>
									<FormControl>
										<Input min={0} max={100000} type='number' placeholder='50' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='percent'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Процент скидки</FormLabel>
									<FormControl>
										<Input type='number' placeholder='10' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button className='w-full' type='submit'>
						Добавить
					</Button>
				</div>
			</form>
		</Form>
	)
}
