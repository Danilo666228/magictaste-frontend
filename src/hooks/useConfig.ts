import { useConfigStore } from '@/store/useConfigStore'

export function useConfig() {
	const accentColor = useConfigStore(state => state.accentColor)
	const accentRadius = useConfigStore(state => state.accentRadius)
	const fontSize = useConfigStore(state => state.fontSize)
	const fontFamily = useConfigStore(state => state.fontFamily)
	const setAccentColor = useConfigStore(state => state.setAccentColor)
	const setAccentRadius = useConfigStore(state => state.setAccentRadius)
	const setFontSize = useConfigStore(state => state.setFontSize)
	const setFontFamily = useConfigStore(state => state.setFontFamily)

	return {
		accentColor,
		accentRadius,
		fontSize,
		fontFamily,
		setAccentColor,
		setAccentRadius,
		setFontSize,
		setFontFamily
	}
}
