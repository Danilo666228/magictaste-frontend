import type { MetadataRoute } from 'next'

import { SITE_DESCRIPTION, SITE_NAME } from '@/shared/utils/constants'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: SITE_NAME,
		description: SITE_DESCRIPTION,
		start_url: '/',
		display: 'standalone',
		orientation: 'portrait'
	}
}
