'use client'

import { ComponentProps } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from '@/components/ui/common'

import { LoyaltySchema } from '@/schemas/loyalty/lotalty'

// Проверьте импорт схемы

interface LoyaltyFormProps extends ComponentProps<typeof Card> {}

export function LoyaltyForm({ ...props }: LoyaltyFormProps) {
	const form = useForm<LoyaltySchema>({
		defaultValues: {
			title: '',
			minPoints: 0,
			proccent: 0
		}
	})

	const onSubmit = (data: LoyaltySchema) => {
		console.log(data)
		// Тут добавьте логику обработки отправки данных
	}

	return (
		<Card {...props} className='h-fit max-w-lg'>
			<CardHeader className='bg-muted/50 text-2xl'>
				<CardTitle>Добавить уровень лояльности</CardTitle>
			</CardHeader>
			<CardContent className='pt-4'>
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
											<FormLabel>Минимальное количество баллов</FormLabel>
											<FormControl>
												<Input type='number' placeholder='50' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='proccent'
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
			</CardContent>
		</Card>
	)
}
