'use client'

import { ArrowLeft, GalleryVerticalEnd } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

import { Button, Typography } from '@/components/ui/common'

import { ROUTE } from '@/config/route.config'

interface LayoutProps {
	children: ReactNode
}

export default function AuthLayout({ children }: LayoutProps) {
	const router = useRouter()
	return (
		<div className="grid min-h-svh overflow-hidden bg-gradient-to-br from-background to-muted lg:grid-cols-1">
			<div className="relative z-10 flex flex-col gap-6 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Link href="/" className="group flex items-center gap-2 font-medium transition-all hover:opacity-80">
						<div
							className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md transition-all group-hover:scale-110">
							<GalleryVerticalEnd className="size-4" />
						</div>
						<span className="text-lg font-semibold">Magic Taste.</span>
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div
						className="flex w-full max-w-xl flex-col rounded-2xl border border-border/40 bg-background/90 p-8 shadow-xl backdrop-blur-xl transition-all hover:shadow-lg">
						{children}
						<Button onClick={() => router.push(ROUTE.home)} className="group mt-1" variant={'link'}>
							<ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
							На главную
						</Button>
						<div className={'border-t pt-3'}>
							<Typography className="block text-center text-xs text-muted-foreground">
								Этот сайт защищен reCAPTCHA от Google.
								<Link
									href="https://policies.google.com/privacy"
									className="ml-1 underline hover:text-primary"
									target="_blank"
									rel="noopener noreferrer">
									Политика конфиденциальности
								</Link> {''}
								и
								<Link
									href="https://policies.google.com/terms"
									className="ml-1 underline hover:text-primary"
									target="_blank"
									rel="noopener noreferrer">
									Условия использования
								</Link> {''}
								применяются.
							</Typography>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
