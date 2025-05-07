import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { BaseColor } from '@/lib/constants/color.constats'

interface ConfigStore {
	accentRadius: number
	accentColor: BaseColor
	fontSize: number
	fontFamily: string
	language: string
	setLanguage: (language: string) => void
	setAccentRadius: (accentRadius: number) => void
	setAccentColor: (accentColor: BaseColor) => void
	setFontSize: (fontSize: number) => void
	setFontFamily: (fontFamily: string) => void
}

const initialState: ConfigStore = {
	accentRadius: 8,
	accentColor: 'slate',
	fontSize: 16,
	language: 'ru',
	fontFamily: 'fira-sans',
	setLanguage: (language: string) => {},
	setAccentRadius: (accentRadius: number) => {},
	setAccentColor: (accentColor: BaseColor) => {},
	setFontSize: (fontSize: number) => {},
	setFontFamily: (fontFamily: string) => {}
}

export const useConfigStore = create<ConfigStore>()(
	persist<ConfigStore>(
		set => ({
			...initialState,
			setAccentColor: (accentColor: BaseColor) => set({ accentColor }),
			setAccentRadius: (accentRadius: number) => set({ accentRadius }),
			setFontSize: (fontSize: number) => set({ fontSize }),
			setFontFamily: (fontFamily: string) => set({ fontFamily }),
			setLanguage: (language: string) => set({ language })
		}),
		{
			name: 'config'
		}
	)
)
