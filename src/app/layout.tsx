import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { ReactNode } from 'react'

import '@/styles/globals.css'

import { CLIENT_URL } from '@/shared/utils/constants'
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME } from '@/shared/utils/constants/seo'

import { Providers } from './providers'

interface RootLayoutProps {
	children: ReactNode
}
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

export default async function RootLayout({ children }: RootLayoutProps) {
	const locale = await getLocale()
	const messages = await getMessages()

	return (
		<html lang={locale} suppressHydrationWarning>
			<body>
				<NextIntlClientProvider messages={messages}>
					<Providers>{children}</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
