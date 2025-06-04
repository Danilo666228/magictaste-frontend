import { Fira_Sans, Inter, JetBrains_Mono, Montserrat, Roboto } from 'next/font/google'

const inter = Inter({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin', 'cyrillic']
})

const jetBrainsMono = JetBrains_Mono({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
	subsets: ['latin', 'cyrillic', 'cyrillic-ext', 'vietnamese']
})

const roboto = Roboto({
	weight: ['100', '300', '400', '500', '700', '900'],
	subsets: ['latin', 'cyrillic']
})

const montserrat = Montserrat({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin', 'cyrillic']
})

const firaSans = Fira_Sans({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
	subsets: ['latin', 'cyrillic', 'cyrillic-ext', 'vietnamese']
})

export const fonts = {
	inter: inter,
	roboto: roboto,
	montserrat: montserrat,
	'fira-sans': firaSans,
	jetBrainsMono: jetBrainsMono
}

export type Font = (typeof fonts)[keyof typeof fonts]
