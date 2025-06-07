import { Banknote, CreditCard } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage, Label, RadioGroup, RadioGroupItem, Typography } from '@/components/ui/common'

import { TypeCheckoutSchema } from '@/schemas/checkout/checkout'

import { cn } from '@/shared/hooks/helpers'

interface PaymentFieldProps {
	form: UseFormReturn<TypeCheckoutSchema>
}

export function PaymentField({ form }: PaymentFieldProps) {
	return (
		<div className='space-y-8'>
			<div className='flex items-center gap-4 rounded-2xl bg-primary/5 p-6'>
				<div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10'>
					<CreditCard className='h-6 w-6 text-primary' />
				</div>
				<div>
					<Typography tag='h3' className='text-xl font-bold text-foreground'>
						Способ оплаты
					</Typography>
					<Typography className='text-sm text-muted-foreground'>Выберите удобный способ оплаты заказа</Typography>
				</div>
			</div>

			<div className='space-y-6'>
				<FormField
					control={form.control}
					name='paymentMethod'
					render={({ field }) => (
						<FormItem className='space-y-4'>
							<FormLabel className='text-lg font-semibold'>Как вы хотите оплатить?</FormLabel>
							<FormControl>
								<RadioGroup defaultValue={field.value} onValueChange={field.onChange} className='grid gap-4'>
									<div
										className={cn(
											'group relative cursor-pointer overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300',
											field.value === 'CARD'
												? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
												: 'border-border bg-background/80 hover:border-primary/50 hover:bg-primary/5'
										)}>
										<RadioGroupItem value='CARD' id='CARD' className='absolute right-4 top-4' />
										<Label htmlFor='CARD' className='flex cursor-pointer items-start gap-4'>
											<div
												className={cn(
													'flex h-14 w-14 items-center justify-center rounded-xl transition-colors',
													field.value === 'CARD' ? 'bg-primary/10' : 'bg-muted/50'
												)}>
												<CreditCard
													className={cn(
														'h-7 w-7 transition-colors',
														field.value === 'CARD' ? 'text-primary' : 'text-muted-foreground'
													)}
												/>
											</div>
											<div className='flex-1 space-y-3'>
												<Typography className='text-lg font-semibold'>Банковской картой</Typography>

												<div className='flex items-center gap-3'>
													<div className='flex items-center gap-2'>
														<div className='rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white'>VISA</div>
														<div className='rounded bg-red-600 px-2 py-1 text-xs font-medium text-white'>MC</div>
														<div className='rounded bg-green-600 px-2 py-1 text-xs font-medium text-white'>МИР</div>
													</div>
												</div>
											</div>
										</Label>
									</div>

									<div
										className={cn(
											'group relative cursor-pointer overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300',
											field.value === 'CASH'
												? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
												: 'border-border bg-background/80 hover:border-primary/50 hover:bg-primary/5'
										)}>
										<RadioGroupItem value='CASH' id='CASH' className='absolute right-4 top-4' />
										<Label htmlFor='CASH' className='flex cursor-pointer items-center gap-4'>
											<div
												className={cn(
													'flex h-14 w-14 items-center justify-center rounded-xl transition-colors',
													field.value === 'CASH' ? 'bg-primary/10' : 'bg-muted/50'
												)}>
												<Banknote
													className={cn(
														'h-7 w-7 transition-colors',
														field.value === 'CASH' ? 'text-primary' : 'text-muted-foreground'
													)}
												/>
											</div>

											<Typography className='text-lg font-semibold'>Наличными курьеру</Typography>
										</Label>
									</div>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</div>
	)
}
