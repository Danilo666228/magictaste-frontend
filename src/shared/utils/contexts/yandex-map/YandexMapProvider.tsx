'use client'

import { YANDEX_MAPS_API_KEY } from '@/shared/utils/constants/env'
import { YMaps } from '@pbe/react-yandex-maps'

export const YandexMapsProvider = ({ children }: { children: React.ReactNode }) => {
	return <YMaps query={{ apikey: YANDEX_MAPS_API_KEY, lang: 'ru_RU' }}>{children}</YMaps>
}
