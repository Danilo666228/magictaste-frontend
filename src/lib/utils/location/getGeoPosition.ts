import { IGeocodeResult } from 'yandex-maps'

export const getGeoPosition = (result: IGeocodeResult) => {
	const firstGeoObject = result.geoObjects.get(0)

	if (firstGeoObject) {
		const properties = firstGeoObject.properties

		const location = String(properties.get('description', {}))
		const route = String(properties.get('name', {}))

		return {
			location,
			route
		}
	}

	return null
}
