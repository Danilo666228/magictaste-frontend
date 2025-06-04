import { MEDIA_URL } from '@/shared/utils/constants/env'

export function getMediaSource(path: string | undefined | null) {
	if (!path) return MEDIA_URL + '/imageonline-co-placeholder-image.jpg'
	return MEDIA_URL + path
}
