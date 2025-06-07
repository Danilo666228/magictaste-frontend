import { ArrowLeft, Home, Search } from 'lucide-react'
import Link from 'next/link'

import { Typography } from '@/components/ui/common'

import { ROUTE } from '@/shared/utils/constants/route'

export default function NotFound() {
	return (
		<div className='relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-background/80 px-4'>
			{/* Декоративные элементы */}
			<div className='absolute inset-0 -z-10 overflow-hidden'>
				<div className='absolute left-1/4 top-20 h-40 w-40 animate-pulse rounded-full bg-primary/5 blur-3xl'></div>
				<div className='bg-primary/3 absolute bottom-20 right-1/4 h-32 w-32 animate-pulse rounded-full blur-2xl'></div>
			</div>

			<div className='relative mx-auto max-w-lg text-center'>
				{/* Large 404 */}
				<div className='relative mb-8'>
					<Typography tag='h1' className='text-8xl font-bold text-muted/30 md:text-9xl'>
						404
					</Typography>

					{/* Floating search icon */}
					<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
						<div className='flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg backdrop-blur-sm'>
							<Search className='h-10 w-10 text-primary' />
						</div>
					</div>
				</div>

				{/* Content */}
				<div className='space-y-6 rounded-2xl bg-background/60 p-8 shadow-xl backdrop-blur-sm'>
					<Typography tag='h2' className='text-2xl font-bold md:text-3xl'>
						<span className='bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>Страница не найдена</span>
					</Typography>

					<Typography tag='p' className='max-w-md leading-relaxed text-muted-foreground'>
						Извините, мы не смогли найти страницу оформления заказа. Возможно, ваша сессия истекла или произошла ошибка.
					</Typography>

					{/* Action buttons */}
					<div className='flex flex-col gap-4 pt-4 sm:flex-row sm:justify-center'>
						<Link
							href={ROUTE.home}
							className='group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 px-6 py-3 font-medium text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/25'>
							<div className='flex h-8 w-8 items-center justify-center rounded-full bg-white/20'>
								<Home size={16} />
							</div>
							<span>Главная страница</span>
							<span className='transition-transform group-hover:translate-x-1'>→</span>
						</Link>

						<Link
							href='/products'
							className='group inline-flex items-center justify-center gap-3 rounded-xl border border-border bg-background/80 px-6 py-3 font-medium text-foreground shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-primary/10'>
							<ArrowLeft size={16} />
							<span>К покупкам</span>
						</Link>
					</div>

					{/* Help text */}
					<div className='border-t border-border/50 pt-4'>
						<Typography className='text-sm text-muted-foreground'>Если проблема повторяется, обратитесь в службу поддержки</Typography>
					</div>
				</div>

				{/* Decorative line */}
				<div className='mx-auto mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-primary/50 to-primary/20'></div>
			</div>
		</div>
	)
}
