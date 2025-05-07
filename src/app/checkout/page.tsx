import { CheckIcon } from 'lucide-react'
import Image from 'next/image'

import { Typography } from '@/components/ui/common'

import { CheckoutForm } from './(components)/CheckoutForm/CheckoutForm'
import { OrderList } from './(components)/OrderList'

export default async function CheckoutPage() {
	return (
		<div className='flex min-h-screen w-full flex-col bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e0e7ef]'>
			<header className='sticky top-0 z-20 w-full border-b bg-background px-0 py-4 shadow-sm backdrop-blur-md md:px-0'>
				<div className='mx-auto flex max-w-4xl items-center justify-between px-4 md:px-0'>
					<div className='flex items-center gap-3'>
						<Image src={'/logo.png'} alt='Logo' width={56} height={56} className='rounded-lg shadow-md' />
						<Typography tag='h3' className='text-lg font-bold tracking-tight text-gray-800'>
							MagicTaste
						</Typography>
					</div>
					<div className='flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-green-600'>
						<CheckIcon className='h-4 w-4' />
						<span className='text-xs font-medium text-green-700'>Безопасное оформление</span>
					</div>
				</div>
			</header>

			<main className='flex flex-1 justify-center px-2 py-8 md:px-0'>
				<div className='relative flex w-full max-w-[80%] flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white/90 shadow-2xl md:flex-row'>
					<div className='flex w-full flex-col justify-center gap-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 md:w-3/5 md:p-10'>
						<Typography tag='h1' className='mb-2 text-2xl font-bold text-gray-900 md:text-3xl'>
							Оформление заказа
						</Typography>
						<Typography className='mb-4 text-sm text-gray-500 md:text-base'>
							Заполните форму, чтобы мы могли приготовить и доставить ваш заказ как можно быстрее.
						</Typography>
						<CheckoutForm />
					</div>

					<div className='sticky flex w-full flex-col gap-4 border-t border-gray-100 bg-gradient-to-tl from-[#f1f5f9] to-white p-6 md:top-8 md:w-2/5 md:border-l md:border-t-0 md:p-8'>
						<Typography tag='h2' className='mb-2 text-lg font-semibold text-gray-800'>
							Ваш заказ
						</Typography>
						<OrderList />
					</div>
				</div>
			</main>
			<footer className='mt-auto w-full py-4 text-center text-xs text-gray-400'>
				&copy; {new Date().getFullYear()} Ресторан русской кухни. Все права защищены.
			</footer>
		</div>
	)
}
