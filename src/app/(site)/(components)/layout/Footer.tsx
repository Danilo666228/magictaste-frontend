'use client'

import Link from 'next/link'

import { Typography } from '@/components/ui/common'

import { ROUTE } from '@/shared/utils/constants/route'

export function Footer() {
	return (
		<footer className='relative mt-5 overflow-hidden border-t text-foreground'>
			<div className='absolute inset-0 -z-10'>
				<div className='bg-primary/4 absolute left-20 top-10 h-64 w-64 rounded-full blur-3xl'></div>
				<div className='bg-primary/6 absolute bottom-10 right-20 h-48 w-48 rounded-full blur-3xl'></div>
			</div>

			<div className='container mx-auto px-4 py-16 lg:px-8'>
				<div className='relative'>
					<div className='mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4'>
						<div className='lg:col-span-2'>
							<div className='mb-6'>
								<Typography tag='h3' className='mb-4 text-2xl font-bold'>
									<span className='bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>Вошебный вкус</span>
								</Typography>
								<Typography className='max-w-md leading-relaxed text-muted-foreground'>
									Ресторан с <span className='font-semibold text-primary'>особенной атмосферой</span> и изысканной кухней.
									Доставляем вкус прямо к вашему столу с 2010 года.
								</Typography>
							</div>

							<div className='flex gap-6'>
								{[
									{ number: '14+', label: 'лет опыта' },
									{ number: '50k+', label: 'довольных гостей' },
									{ number: '4.9★', label: 'рейтинг' }
								].map((stat, index) => (
									<div key={index} className='flex items-center gap-3 text-center'>
										<Typography className='text-lg font-bold text-primary'>{stat.number}</Typography>
										<Typography className='text-xs text-muted-foreground'>{stat.label}</Typography>
									</div>
								))}
							</div>
						</div>

						<div className=''>
							<Typography tag='h4' className='mb-6 text-lg font-semibold'>
								Навигация
							</Typography>
							<nav className='space-y-3'>
								{[
									{ href: ROUTE.home, label: 'Главная' },
									{ href: ROUTE.about, label: 'О нас' },
									{ href: ROUTE.category(), label: 'Меню' }
								].map((link, index) => (
									<Link
										key={index}
										href={link.href}
										className='group block text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary'>
										<span className='relative'>
											{link.label}
											<span className='absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full'></span>
										</span>
									</Link>
								))}
							</nav>
						</div>

						<div className=''>
							<Typography tag='h4' className='mb-6 text-lg font-semibold'>
								Контакты
							</Typography>
							<address className='space-y-4 text-sm not-italic'>
								{[
									{ icon: '📍', text: 'Ул. Маркина 26' },
									{ icon: '📞', text: '(876) 456-7890' },
									{ icon: '✉️', text: 'info@magictaste.store' },
									{ icon: '⏰', text: 'Ежедневно 10:00-23:00' }
								].map((contact, index) => (
									<div key={index} className='group flex items-center gap-3 transition-colors duration-300 hover:text-primary'>
										<span className='text-base'>{contact.icon}</span>
										<Typography className='transition-colors duration-300 group-hover:text-primary'>{contact.text}</Typography>
									</div>
								))}
							</address>
						</div>
					</div>

					<div className='mb-8 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent'></div>

					<div className='flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left'>
						<div className='space-x-2'>
							<Typography className='text-sm text-muted-foreground'>© 2025 Magic Taste. Все права защищены.</Typography>
							<Typography className='text-xs text-muted-foreground/70'>Сделано с ❤️ для наших гостей</Typography>
						</div>

						<nav className='flex flex-wrap justify-center gap-6 text-xs md:justify-end'>
							{['Политика конфиденциальности', 'Условия использования', 'Политика cookies'].map((link, index) => (
								<Link key={index} href='#' className='group text-muted-foreground transition-all duration-300 hover:text-primary'>
									<span className='relative'>
										{link}
										<span className='absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full'></span>
									</span>
								</Link>
							))}
						</nav>
					</div>

					<div className='absolute -bottom-2 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/50 to-primary/20'></div>
				</div>
			</div>
		</footer>
	)
}
