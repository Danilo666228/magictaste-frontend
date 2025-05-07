'use client'

import { useEffect, useLayoutEffect } from 'react'

import { useConfig } from '@/hooks/useConfig'

import { fonts } from '@/lib/constants/font.constants'

export function ConfigProvider() {
	const { accentColor, accentRadius, fontSize, fontFamily } = useConfig()

	useEffect(() => {
		if (typeof window === 'undefined') return

		const applyThemeConfig = () => {
			document.documentElement.style.setProperty('--accent-color', accentColor)
			document.documentElement.style.setProperty('--font-size', `${fontSize}px`)
			document.documentElement.style.setProperty('--font-size-base', `${fontSize}px`)
			document.documentElement.setAttribute('data-theme', accentColor)
			document.documentElement.style.setProperty('--radius', `${accentRadius}px`)
			document.body.classList.value = fonts[fontFamily as keyof typeof fonts].className
		}
		applyThemeConfig()

		return () => {
			document.documentElement.removeAttribute('data-theme')
			document.documentElement.style.removeProperty('--accent-color')
			document.documentElement.style.removeProperty('--font-size')
			document.documentElement.style.removeProperty('--font-size-base')
			document.documentElement.style.removeProperty('--radius')
			document.body.classList.value = ''
		}
	}, [accentColor, accentRadius, fontSize, fontFamily])

	return null
}
