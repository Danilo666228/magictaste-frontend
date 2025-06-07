import { Mail, Phone, User, UserCheck } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Typography } from '@/components/ui/common'

import { TypeCheckoutSchema } from '@/schemas/checkout/checkout'

interface AboutUserProps {
	form: UseFormReturn<TypeCheckoutSchema>
}

export function AboutUserField({ form }: AboutUserProps) {
	return (
		<div className='space-y-8'>
			<div className='flex items-center gap-4 rounded-2xl bg-primary/5 p-6'>
				<div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10'>
					<UserCheck className='h-6 w-6 text-primary' />
				</div>
				<div>
					<Typography tag='h3' className='text-xl font-bold text-foreground'>
						Личные данные
					</Typography>
					<Typography className='text-sm text-muted-foreground'>Заполните информацию для связи с вами</Typography>
				</div>
			</div>

			<div className='space-y-6'>
				<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
					<FormField
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<FormItem className='space-y-3'>
								<div className='flex justify-between'>
									<FormLabel className='flex items-center gap-2 font-medium'>
										<User className='h-4 w-4 text-primary' />
										Имя
									</FormLabel>
									<FormMessage />
								</div>
								<FormControl>
									<Input className='' type='text' placeholder='Даниил' {...field} />
								</FormControl>
								<FormDescription className='text-xs'>Введите ваше имя</FormDescription>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='lastName'
						render={({ field }) => (
							<FormItem className='space-y-3'>
								<div className='flex justify-between'>
									<FormLabel className='flex items-center gap-2 font-medium'>
										<User className='h-4 w-4 text-primary' />
										Фамилия
									</FormLabel>
									<FormMessage />
								</div>
								<FormControl>
									<Input type='text' placeholder='Иванов' {...field} />
								</FormControl>
								<FormDescription className='text-xs'>Введите вашу фамилию</FormDescription>
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem className='space-y-3'>
							<div className='flex justify-between'>
								<FormLabel className='flex items-center gap-2 font-medium'>
									<Phone className='h-4 w-4 text-primary' />
									Телефон
								</FormLabel>
								<FormMessage />
							</div>
							<FormControl>
								<PhoneInput countries={[['Russia', 'ru', '7', '(...) ...-..-..', 1]]} defaultCountry='ru' {...field} />
							</FormControl>
							<FormDescription className='flex items-center gap-2 text-xs'>
								<Typography className='h-1 w-1 rounded-full bg-primary'></Typography>
								Введите номер телефона для связи с курьером
							</FormDescription>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='space-y-3'>
							<div className='flex justify-between'>
								<FormLabel className='flex items-center gap-2 font-medium'>
									<Mail className='h-4 w-4 text-primary' />
									Email
								</FormLabel>
								<FormMessage />
							</div>
							<FormControl>
								<Input type='email' placeholder='example@mail.ru' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
			</div>
		</div>
	)
}
