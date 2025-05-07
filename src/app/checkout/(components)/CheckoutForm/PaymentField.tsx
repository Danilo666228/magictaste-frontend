import { Banknote, CreditCard } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import {
	Container,
	FormBlock,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Label,
	RadioGroup,
	RadioGroupItem
} from '@/components/ui/common'

import { TypeCheckoutSchema } from '@/schemas/checkout/checkout'

interface PaymentFieldProps {
	form: UseFormReturn<TypeCheckoutSchema>
}

export function PaymentField({ form }: PaymentFieldProps) {
	return (
		<FormBlock title='Способ оплаты'>
			<Container className='flex flex-col gap-5'>
				<FormField
					control={form.control}
					name='paymentMethod'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel>Выберите способ оплаты</FormLabel>
							<FormControl>
								<RadioGroup defaultValue={field.value} onValueChange={field.onChange} className='flex flex-col gap-3'>
									<div className='flex items-center space-x-2 rounded-md border p-4'>
										<RadioGroupItem value='CARD' id='CARD' />
										<Label htmlFor='CARD' className='flex flex-1 cursor-pointer items-center gap-3'>
											<CreditCard className='h-5 w-5 text-gray-500' />
											<div>
												<div className='font-medium'>Банковской картой</div>
												<div className='text-sm text-gray-500'>Visa, MasterCard, Мир</div>
											</div>
										</Label>
									</div>
									<div className='flex items-center space-x-2 rounded-md border p-4'>
										<RadioGroupItem value='CASH' id='CASH' />
										<Label htmlFor='CASH' className='flex flex-1 cursor-pointer items-center gap-3'>
											<Banknote className='h-5 w-5 text-gray-500' />
											<div>
												<div className='font-medium'>Наличными курьеру</div>
												<div className='text-sm text-gray-500'>Оплата при получении</div>
											</div>
										</Label>
									</div>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</Container>
		</FormBlock>
	)
}
