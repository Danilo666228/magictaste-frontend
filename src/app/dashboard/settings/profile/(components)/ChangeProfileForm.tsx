'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { EditIcon, Loader2, XIcon } from 'lucide-react'

import {
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	Container,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Skeleton
} from '@/components/ui/common'

import { useChangeProfileForm } from '../../(hooks)/useChangeProfileForm'

import { cn } from '@/lib/utils/twMerge'

export function ChangeProfileForm() {
	const { form, isPending, isProfilePending, onSubmit } = useChangeProfileForm()

	if (isProfilePending) return <ChangeProfileFormSkeleton />

	const { isDirty, isValid } = form.formState

	return (
		<motion.div className='h-full w-full'>
			<Card className='w-full border shadow-sm'>
				<CardHeader className='flex flex-row items-center justify-between gap-4 bg-muted/30 pb-4'>
					<CardTitle className='text-xl font-medium'>Настройки профиля</CardTitle>
				</CardHeader>
				<CardContent className='p-6'>
					<Form {...form}>
						<form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem className='px-0'>
										<Container className='flex items-center justify-between p-0'>
											<FormLabel className='text-sm font-medium'>Email</FormLabel>
											<FormMessage />
										</Container>
										<FormControl>
											<Input disabled={isPending} {...field} />
										</FormControl>
										<FormDescription className='text-xs'>Ваша почта для входа и уведомлений</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='userName'
								render={({ field }) => (
									<FormItem className='px-0'>
										<Container className='flex items-center justify-between p-0'>
											<FormLabel className='text-sm font-medium'>Имя пользователя</FormLabel>
											<FormMessage />
										</Container>
										<FormControl>
											<Input disabled={isPending} {...field} />
										</FormControl>
										<FormDescription className='text-xs'>Ваше отображаемое имя в системе</FormDescription>
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</CardContent>
				<CardFooter className=''>
					{isValid && isDirty && (
						<Button onClick={form.handleSubmit(onSubmit)} type='submit' disabled={isPending} className='w-full'>
							{isPending ? 'Сохранение...' : 'Сохранить'}
						</Button>
					)}
				</CardFooter>
			</Card>
		</motion.div>
	)
}

export function ChangeProfileFormSkeleton() {
	return <Skeleton className='h-[350px] w-full rounded-xl' />
}
