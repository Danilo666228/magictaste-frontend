'use client'

import Link from 'next/link'

import { ROUTE } from '@/config/route.config'
import { Typography } from '@/components/ui/common'

export function Footer() {
	return (
		<footer className="relative mt-5 border-t text-foreground">
			<div className="md:px -6 container mx-auto px-4 py-12 lg:px-8">
				<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-2">
					<div className="justify-self-center text-center">
						<h3 className="mb-4 text-lg font-semibold">Навигация</h3>
						<nav className="space-y-2 text-sm">
							<Link
								href={ROUTE.home} className="block transition-colors hover:text-primary">
								Главная
							</Link>
							<Link
								href={'#'} className="block transition-colors hover:text-primary">
								О нас
							</Link>
							<Link
								href={ROUTE.menu()}
								className="block transition-colors hover:text-primary">
								Меню
							</Link>
						</nav>
					</div>
					<div className="justify-self-center text-center lg:text-start">
						<Typography tag={'h3'} className="mb-4 text-lg font-semibold">Наши контакты</Typography>
						<address className="flex flex-col gap-2 text-sm not-italic">
							<Typography>123 Innovation Street</Typography>
							<Typography>Ул. Маркина 26</Typography>
							<Typography>Телефон: (876) 456-7890</Typography>
							<Typography>Email: kovinskiymagictate.store</Typography>
						</address>
					</div>
				</div>
				<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
					<Typography className="text-sm text-muted-foreground">
						© 2025 Magic Taste. Все права защищены.
					</Typography>
					<nav className="flex gap-4 text-sm">
						<Link href="#" className="transition-colors hover:text-primary">
							Политика конфиденциальности
						</Link>
						<Link href="#" className="transition-colors hover:text-primary">
							Условия использования
						</Link>
						<Link href="#" className="transition-colors hover:text-primary">
							Политика использования файлов cookie
						</Link>
					</nav>
				</div>
			</div>
		</footer>
	)
}
