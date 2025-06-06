'use client'

import { createContext } from 'react'

import { AccentColors } from './utils/accent-colors'

export type FontFamily = 'Geist' | 'Inter'

export type RoundedRadius = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'

export interface ConfigState {
	accent: {
		color: AccentColors
		setColor: (color: AccentColors) => void
	}
	font: {
		family: FontFamily
		setFamily: (font: FontFamily) => void
	}
	rounded: {
		radius: RoundedRadius
		setRadius: (radius: RoundedRadius) => void
	}
}

export const initialConfig: ConfigState = {
	accent: {
		color: 'Orange',
		setColor: () => {}
	},
	font: {
		family: 'Geist',
		setFamily: () => {}
	},
	rounded: {
		radius: 'md',
		setRadius: () => {}
	}
}
export const ConfigContext = createContext<ConfigState>(initialConfig)
