import { CheckCircle, Home, Package, Sparkles } from 'lucide-react'
import Link from 'next/link'

import { Typography } from '@/components/ui/common'

import { ROUTE } from '@/shared/utils/constants/route'

export default function ThanksPage() {
	return (
		<div className='relative flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-background/80 p-4'>
			{/* Декоративные элементы */}
			<div className='absolute inset-0 -z-10 overflow-hidden'>
				<div className='absolute left-1/4 top-20 h-40 w-40 animate-pulse rounded-full bg-primary/5 blur-3xl'></div>
				<div className='bg-primary/3 absolute bottom-20 right-1/4 h-32 w-32 animate-pulse rounded-full blur-2xl'></div>
				<div className='bg-primary/4 absolute left-1/2 top-1/2 h-24 w-24 animate-pulse rounded-full blur-xl'></div>
			</div>

			<div className='relative w-full max-w-md'>
				{/* Success Animation */}
				<div className='mb-8 flex justify-center'>
					<div className='relative'>
						<div className='flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-green-50 shadow-2xl'>
							<CheckCircle className='h-12 w-12 animate-pulse text-green-600' />
						</div>
						{/* Floating sparkles */}
						<div className='absolute -right-2 -top-2 flex h-8 w-8 animate-bounce items-center justify-center rounded-full bg-primary/20'>
							<Sparkles className='h-4 w-4 text-primary' />
						</div>
						<div className='absolute -bottom-2 -left-2 flex h-6 w-6 animate-pulse items-center justify-center rounded-full bg-green-200'>
							<span className='text-sm'>✨</span>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className='rounded-3xl bg-background/80 p-8 text-center shadow-2xl backdrop-blur-sm'>
					<div className='space-y-6'>
						<Typography tag='h1' className='text-3xl font-bold md:text-4xl'>
							<span className='bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent'>Спасибо за заказ!</span>
						</Typography>

						<Typography tag='p' className='leading-relaxed text-muted-foreground'>
							Ваш заказ успешно оформлен. Мы отправим вам <span className='font-semibold text-primary'>SMS-уведомление</span>, когда он
							будет готов к получению или доставке.
						</Typography>

						{/* Features */}
						<div className='grid grid-cols-3 gap-4 py-4'>
							{[
								{ icon: '📱', label: 'SMS уведомления' },
								{ icon: '🚚', label: 'Отслеживание' },
								{ icon: '⭐', label: 'Качество' }
							].map((feature, index) => (
								<div key={index} className='flex flex-col items-center gap-2 rounded-xl bg-primary/5 p-3'>
									<span className='text-2xl'>{feature.icon}</span>
									<Typography className='text-xs font-medium text-muted-foreground'>{feature.label}</Typography>
								</div>
							))}
						</div>

						{/* Action Buttons */}
						<div className='space-y-4 pt-4'>
							<Link
								href={ROUTE.dashboard.orders}
								className='group block w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 px-6 py-4 font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/25'>
								<div className='flex items-center justify-center gap-3'>
									<div className='flex h-8 w-8 items-center justify-center rounded-full bg-white/20'>
										<Package size={16} />
									</div>
									<span>Мои заказы</span>
									<span className='transition-transform group-hover:translate-x-1'>→</span>
								</div>
							</Link>

							<Link
								href={ROUTE.home}
								className='group block w-full rounded-xl border border-border bg-background/80 px-6 py-4 font-medium text-foreground shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-primary/10'>
								<div className='flex items-center justify-center gap-3'>
									<Home size={16} />
									<span>Вернуться на главную</span>
								</div>
							</Link>
						</div>

						{/* Additional Info */}
						<div className='border-t border-border/50 pt-6'>
							<Typography className='text-sm text-muted-foreground'>Номер заказа будет отправлен на указанную почту</Typography>
						</div>
					</div>
				</div>

				{/* Decorative line */}
				<div className='mx-auto mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-primary/50 to-primary/20'></div>
			</div>
		</div>
	)
}
