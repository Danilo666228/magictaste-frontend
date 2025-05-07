import Link from 'next/link'

import { ROUTE } from '@/config/route.config'

export default function ThanksPage() {
	return (
		<div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4'>
			<div className='w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg'>
				<div className='mb-6'>
					<div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
						<svg className='h-8 w-8 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
						</svg>
					</div>
				</div>

				<h1 className='mb-4 text-3xl font-bold text-gray-800'>Спасибо за заказ!</h1>

				<p className='mb-6 text-gray-600'>Ваш заказ успешно оформлен. Мы отправим вам уведомление, когда он будет готов.</p>

				<div className='space-y-4'>
					<Link
						href={ROUTE.dashboard.orders}
						className='block w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition duration-200 hover:bg-green-700'>
						Посмотреть мои заказы
					</Link>

					<Link
						href={ROUTE.home}
						className='block w-full rounded-lg bg-gray-100 px-4 py-3 font-medium text-gray-700 transition duration-200 hover:bg-gray-200'>
						Вернуться на главную
					</Link>
				</div>
			</div>
		</div>
	)
}
