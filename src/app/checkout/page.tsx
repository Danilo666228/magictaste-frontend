import { CheckIcon, Sparkles } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'

import { Typography } from '@/components/ui/common'

import { NO_INDEX_PAGE } from '@/shared/utils/constants/seo'

import { Logo } from '../(site)/(components)/layout'

import { CheckoutForm } from './(components)/CheckoutForm/CheckoutForm'
import { OrderList } from './(components)/OrderList'

export const metadata: Metadata = {
	...NO_INDEX_PAGE
}

export default async function CheckoutPage() {
	return (
		<div className='relative min-h-screen w-full bg-gradient-to-br from-background to-background/80'>
			<header className='sticky top-0 z-20 w-full border-b bg-background/80 px-0 py-6 shadow-lg backdrop-blur-xl'>
				<div className='mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6'>
					<div className='flex items-center gap-4'>
						<div className='relative'>
							<Logo />
							<div className='absolute -right-1 -top-1 flex h-6 w-6 animate-pulse items-center justify-center rounded-full bg-primary'>
								<Sparkles className='h-3 w-3 text-primary-foreground' />
							</div>
						</div>
						<div>
							<Typography tag='h3' className='text-xl font-bold'>
								<span className='bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>Волшебный вкус</span>
							</Typography>
							<Typography className='text-xs text-muted-foreground'>Ресторан русской кухни</Typography>
						</div>
					</div>
				</div>
			</header>

			<main className='flex flex-1 justify-center px-4 py-12 md:px-6'>
				<div className='relative w-full max-w-7xl'>
					<div className='mb-8 flex justify-center'>
						<div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-3 text-sm font-medium text-primary backdrop-blur-sm'>
							<CheckIcon className='h-4 w-4 animate-pulse' />
							Оформление заказа
						</div>
					</div>

					<div className='relative overflow-hidden rounded-3xl border-0 bg-background/60 shadow-2xl backdrop-blur-sm md:flex'>
						<div className='flex w-full flex-col justify-center gap-8 p-8 md:w-3/5 md:p-12'>
							<div className='space-y-4'>
								<Typography tag='h1' className='text-3xl font-bold md:text-4xl'>
									<span className='bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
										Последний шаг до вкуса
									</span>
								</Typography>
								<Typography className='max-w-2xl text-lg leading-relaxed text-muted-foreground'>
									Заполните форму, чтобы мы могли <span className='font-semibold text-primary'>приготовить и доставить</span> ваш
									заказ как можно быстрее.
								</Typography>
							</div>

							<CheckoutForm />
						</div>

						<div className='sticky flex w-full flex-col gap-6 border-t border-border/50 bg-gradient-to-br from-background/80 to-background/40 p-8 md:top-8 md:w-2/5 md:border-l md:border-t-0 md:p-10'>
							<OrderList />
						</div>
					</div>
				</div>
			</main>

			<footer className='mt-auto w-full border-t bg-background/60 py-8 text-center backdrop-blur-sm'>
				<div className='mx-auto max-w-4xl px-4'>
					<div className='space-x-2'>
						<Typography className='text-sm font-medium text-foreground'>
							&copy; {new Date().getFullYear()} MagicTaste - Ресторан русской кухни
						</Typography>
						<Typography className='text-xs text-muted-foreground'>Сделано с ❤️ для наших гостей</Typography>
					</div>
					<div className='mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-primary/50 to-primary/20'></div>
				</div>
			</footer>
		</div>
	)
}
