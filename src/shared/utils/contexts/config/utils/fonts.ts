import { GeistSans } from 'geist/font/sans'
import { JetBrains_Mono } from 'next/font/google'

const jetBrainsMono = JetBrains_Mono({
	subsets: ['latin', 'cyrillic'],
	display: 'swap',
	preload: true,
	weight: ['400', '500', '600', '700']
})

export const fonts = {
	Geist: {
		value: 'Geist',
		className: GeistSans.className
	},

	JetBrainsMono: {
		value: 'JetBrainsMono',
		className: jetBrainsMono.className
	}
} as const

export type FontsConfig = typeof fonts
