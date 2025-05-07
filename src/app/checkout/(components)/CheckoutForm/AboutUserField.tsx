import { UseFormReturn } from 'react-hook-form'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'

import {
	Container,
	FormBlock,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from '@/components/ui/common'

import { TypeCheckoutSchema } from '@/schemas/checkout/checkout'

import { useOrderStore } from '@/store/useOrderStore'

interface AboutUserProps {
	form: UseFormReturn<TypeCheckoutSchema>
}

export function AboutUserField({ form }: AboutUserProps) {
	
	return (
		<FormBlock title='Личные данные'>
			<Container className='flex flex-col gap-5'>
				<div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
					<FormField
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<FormItem className='w-full'>
								<Container className='flex justify-between'>
									<FormLabel>Имя</FormLabel>
									<FormMessage />
								</Container>
								<FormControl>
									<Input className='w-full' type='text' placeholder='Даниил' {...field} />
								</FormControl>
								<FormDescription>Введите ваше имя</FormDescription>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='lastName'
						render={({ field }) => (
							<FormItem className='w-full'>
								<Container className='flex justify-between'>
									<FormLabel>Фамилия</FormLabel>
									<FormMessage />
								</Container>
								<FormControl>
									<Input className='w-full' type='text' placeholder='Иванов' {...field} />
								</FormControl>
								<FormDescription>Введите вашу фамилию</FormDescription>
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem className='w-full'>
							<Container className='flex justify-between'>
								<FormLabel>Телефон</FormLabel>
								<FormMessage />
							</Container>
							<FormControl>
								{/* <PatternFormat
									className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
									value={field.value}
									onChange={field.onChange}
									format={'+7(###)-###-##-##'}
								/> */}
								<PhoneInput countries={[['Russia', 'ru', '7', '(...) ...-..-..', 1]]} defaultCountry='ru' {...field} />
							</FormControl>
							<FormDescription>Введите номер телефона для связи</FormDescription>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='w-full'>
							<Container className='flex justify-between'>
								<FormLabel>Email</FormLabel>
								<FormMessage />
							</Container>
							<FormControl>
								<Input className='w-full' type='email' placeholder='example@mail.ru' {...field} />
							</FormControl>
							<FormDescription>Для отправки чека</FormDescription>
						</FormItem>
					)}
				/>
			</Container>
		</FormBlock>
	)
}
