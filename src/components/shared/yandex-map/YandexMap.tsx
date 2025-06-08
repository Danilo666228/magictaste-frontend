'use client'

import { GeolocationControl, Map, Placemark, useYMaps } from '@pbe/react-yandex-maps'
import { useCallback, useEffect, useState } from 'react'

export type Coordinates = {
	latitude: number
	longitude: number
}

export type AddressDetails = {
	fullAddress: string
	street?: string
	house?: string
	city?: string
	country?: string
	postalCode?: string
}

interface AddressComponent {
	kind: 'street' | 'house' | 'locality' | 'country' | string
	name: string
}

interface YandexMapClickEvent {
	get: (key: 'coords') => [number, number]
}

interface YandexMapProps {
	initialCoordinates?: Coordinates
	defaultZoom?: number
	height?: string | number
	width?: string | number
	onLocationSelect?: (data: { coordinates: Coordinates; address: AddressDetails | undefined }) => void
	markerPreset?: string
	showGeolocationControl?: boolean
	readonly?: boolean
	onLoad?: () => void
}

export function YandexMap({
	initialCoordinates = { latitude: 55.76, longitude: 37.64 },
	defaultZoom = 15,
	height = '300px',
	width = '100%',
	onLocationSelect,
	markerPreset = 'islands#redDotIcon',
	showGeolocationControl = false,
	readonly = false,
	onLoad
}: YandexMapProps) {
	const ymaps = useYMaps(['geocode'])
	const [isLoading, setIsLoading] = useState(true)
	const [coordinate, setCoordinate] = useState<[number, number]>([initialCoordinates.latitude, initialCoordinates.longitude])

	useEffect(() => {
		if (ymaps) {
			setIsLoading(false)
			onLoad?.()
		}
	}, [ymaps, onLoad])

	const parseAddressDetails = useCallback((result: any): AddressDetails => {
		try {
			const geoObject = result.geoObjects.get(0)
			const components = geoObject.properties.get('metaDataProperty.GeocoderMetaData.Address.Components', []) as AddressComponent[]

			const addressDetails: AddressDetails = {
				fullAddress: geoObject.properties.get('text', '') as string,
				postalCode: geoObject.properties.get('metaDataProperty.GeocoderMetaData.Address.postal_code', undefined) as string | undefined
			}

			if (Array.isArray(components)) {
				components.forEach((component: AddressComponent) => {
					switch (component.kind) {
						case 'street':
							addressDetails.street = component.name
							break
						case 'house':
							addressDetails.house = component.name
							break
						case 'locality':
							addressDetails.city = component.name
							break
						case 'country':
							addressDetails.country = component.name
							break
					}
				})
			}

			return addressDetails
		} catch (error) {
			console.error('Ошибка парсинга адреса:', error)
			return {
				fullAddress: 'Неизвестный адрес'
			}
		}
	}, [])

	const handleGeocoding = useCallback(
		async (coords: [number, number]) => {
			try {
				if (!ymaps || !onLocationSelect) return
				const result = await ymaps.geocode(coords)
				const addressDetails = parseAddressDetails(result)

				onLocationSelect({
					coordinates: {
						latitude: coords[0],
						longitude: coords[1]
					},
					address: addressDetails
				})
			} catch (error) {
				console.error('Ошибка геокодирования:', error)
				onLocationSelect?.({
					coordinates: {
						latitude: coords[0],
						longitude: coords[1]
					},
					address: undefined
				})
			}
		},
		[ymaps, onLocationSelect, parseAddressDetails]
	)

	const handleClickMap = useCallback(
		(e: YandexMapClickEvent) => {
			if (readonly) return
			const coords = e.get('coords')
			setCoordinate(coords)
			handleGeocoding(coords)
		},
		[handleGeocoding, readonly]
	)

	const handleGeolocation = useCallback(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position: GeolocationPosition) => {
					const userCoords: [number, number] = [position.coords.latitude, position.coords.longitude]
					setCoordinate(userCoords)
					handleGeocoding(userCoords)
				},
				(error: GeolocationPositionError) => console.error('Ошибка получения геолокации:', error)
			)
		}
	}, [handleGeocoding])

	return (
		<div style={{ width, height }} className='relative'>
			{isLoading && (
				<div className='absolute inset-0 z-10 flex items-center justify-center bg-background/80'>
					<div className='h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent' />
				</div>
			)}
			<Map
				defaultState={{
					center: coordinate,
					zoom: defaultZoom
				}}
				width='100%'
				height='100%'
				onClick={handleClickMap}>
				{showGeolocationControl && <GeolocationControl options={{ float: 'right' }} onClick={handleGeolocation} />}
				<Placemark
					geometry={coordinate}
					options={{
						preset: markerPreset,
						draggable: !readonly
					}}
				/>
			</Map>
		</div>
	)
}
