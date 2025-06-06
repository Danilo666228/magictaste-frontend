export type AccentColors = 'Zinc' | 'Rose' | 'Blue' | 'Green' | 'Orange'

export interface AccentColor {
	accentColor: AccentColors
	setAccentColor: (color: AccentColors) => void
}
const accentColors: Record<AccentColors, Record<'primary' | 'primaryForeground', string>> = {
	Orange: {
		primary: '24.6 95% 53.1%',
		primaryForeground: '210 40% 98%'
	},
	Blue: {
		primary: '217.2 91.2% 59.8%',
		primaryForeground: '210 40% 98%'
	},
	Green: {
		primary: '142.1 76.2% 36.3%',
		primaryForeground: '210 40% 98%'
	},
	Rose: {
		primary: '346.8 77.2% 49.8%',
		primaryForeground: '210 40% 98%'
	},
	Zinc: {
		primary: '240 5.9% 10%',
		primaryForeground: '210 40% 98%'
	}
}

export const setAccentColor = (color: AccentColors) => {
	const accentColor = accentColors[color].primary

	document.documentElement.style.setProperty(`--primary`, accentColor)

	for (const color in accentColors) {
		document.documentElement.style.setProperty(`--${color}-primary`, accentColors[color as AccentColors].primary)
		document.documentElement.style.setProperty(`--${color}-primary-foreground`, accentColors[color as AccentColors].primaryForeground)
	}
}
