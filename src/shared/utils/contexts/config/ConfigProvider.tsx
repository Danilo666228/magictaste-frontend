'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'

import { useLocalStorage } from '@/shared/hooks'

import { ConfigContext, ConfigState, FontFamily, RoundedRadius, initialConfig } from './ConfigContext'
import { AccentColors, setAccentColor } from './utils/accent-colors'
import { fonts } from './utils/fonts'
import { getRadiusValue } from './utils/radius'

export function ConfigProvider({ children }: { children: React.ReactNode }) {
	const accentColorStorage = useLocalStorage('config.accent.color', initialConfig.accent.color)
	const fontFamilyStorage = useLocalStorage('config.font.family', initialConfig.font.family)
	const roundedRadiusStorage = useLocalStorage('config.rounded.radius', initialConfig.rounded.radius)
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	useEffect(() => {
		setAccentColor(accentColorStorage.value as AccentColors)
	}, [accentColorStorage.value])

	useEffect(() => {
		const fontFamily = fontFamilyStorage.value as FontFamily
		const fontConfig = fonts[fontFamily as keyof typeof fonts]
		if (fontConfig) {
			document.documentElement.classList.remove(...Object.values(fonts).map(f => f.className))
			document.documentElement.classList.add(fontConfig.className)
		}
	}, [fontFamilyStorage.value])

	useEffect(() => {
		const radius = roundedRadiusStorage.value as RoundedRadius
		const value = getRadiusValue(radius)
		document.documentElement.style.setProperty('--radius', `${value}px`)
	}, [roundedRadiusStorage.value])

	if (!isMounted) return null

	const config: ConfigState = {
		accent: {
			color: accentColorStorage.value as AccentColors,
			setColor: (color: AccentColors) => accentColorStorage.set(color)
		},
		font: {
			family: fontFamilyStorage.value as FontFamily,
			setFamily: (font: FontFamily) => fontFamilyStorage.set(font)
		},
		rounded: {
			radius: roundedRadiusStorage.value as RoundedRadius,
			setRadius: (radius: RoundedRadius) => roundedRadiusStorage.set(radius)
		}
	}

	return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
}
