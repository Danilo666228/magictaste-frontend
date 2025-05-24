import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { Typography } from '@/components/ui/common'

import { ROUTE } from '@/config/route.config'

export default function NotFound() {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 dark:from-gray-900 dark:to-gray-800'>
			<div className='mx-auto max-w-md text-center'>
				<Typography tag='h1' className='text-9xl font-bold text-gray-200 dark:text-gray-700'>
					404
				</Typography>

				<div className='absolute inset-0 flex items-center justify-center'>
					<div className='mt-24 space-y-6 text-center'>
						<Typography tag='h2' className='text-2xl font-bold text-gray-800 dark:text-gray-200'>
							Страница не найдена
						</Typography>

						<Typography tag='p' className='max-w-sm text-gray-600 dark:text-gray-400'>
							Извините, мы не смогли найти страницу, которую вы ищете. Возможно, она была перемещена или удалена.
						</Typography>

						<Link
							href={ROUTE.home}
							className='inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700'>
							<ArrowLeft size={18} />
							Вернуться на главную
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
