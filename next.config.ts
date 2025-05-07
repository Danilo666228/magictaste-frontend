import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src//lib//i18n//request.ts')
const nextConfig: NextConfig = {
	reactStrictMode: false,

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'c3a17b95-3ec0-4b58-83f2-03eeee2732f0.selstorage.ru'
			}
		]
	}
}

export default withNextIntl(nextConfig)
