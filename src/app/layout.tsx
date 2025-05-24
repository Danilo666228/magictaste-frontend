import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { ReactNode } from 'react'

import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME } from '@/lib/constants/seo.constants'
import { CLIENT_URL } from '@/lib/constants/url.constants'

import { ConfigProvider } from '@/providers/ConfigProvider'
import { FramerMotionProvider } from '@/providers/FramerMotionProvider'
import TanStackQueryProvider from '@/providers/TanStackQueryProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { Toaster } from '@/providers/ToastProvider/ToastSonner'
import { YandexMapsProvider } from '@/providers/YandexMapsProvider'

import '@/styles/globals.css'
import '@/styles/theme.css'

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: SITE_DESCRIPTION,
	metadataBase: new URL(CLIENT_URL),
	applicationName: SITE_NAME,
	authors: [{ name: 'Danil Kovinskiy', url: new URL('https://github.com/Danilo666228') }],
	keywords: SITE_KEYWORDS,
	generator: 'Next.js',
	creator: 'Danil Kovinskiy',
	publisher: 'Danil Kovinskiy',
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.ico',
		apple: 'touch-icon/apple-touch-icon.png',
		other: {
			rel: 'touch-icon',
			url: 'touch-icon.png',
			sizes: '256x256'
		}
	},
	openGraph: {
		title: SITE_NAME,
		description: SITE_DESCRIPTION,
		type: 'website',
		locale: 'ru-RU',
		url: new URL(CLIENT_URL),
		siteName: SITE_NAME
	}
}

interface RootLayoutProps {
	children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
	const locale = await getLocale()
	const messages = await getMessages()

	return (
		<html lang={locale} suppressHydrationWarning>
			<body>
				<ConfigProvider />
				<ThemeProvider>
					<NextIntlClientProvider messages={messages}>
						<FramerMotionProvider>
							<TanStackQueryProvider>
								<YandexMapsProvider>
									<Toaster />
									{children}
								</YandexMapsProvider>
							</TanStackQueryProvider>
						</FramerMotionProvider>
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
