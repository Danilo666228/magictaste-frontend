'use client'

import { YMaps } from '@pbe/react-yandex-maps'

import { YANDEX_MAPS_API_KEY } from '@/lib/constants/url.constants'

export function YandexMapsProvider({ children }: { children: React.ReactNode }) {
	return <YMaps query={{ apikey: YANDEX_MAPS_API_KEY, lang: 'ru_RU' }}>{children}</YMaps>
}
