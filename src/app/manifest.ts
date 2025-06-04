import type { MetadataRoute } from 'next'

import { SITE_DESCRIPTION, SITE_NAME } from '@/shared/utils/constants/seo'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: SITE_NAME,
		description: SITE_DESCRIPTION,
		start_url: '/auth/sign-in',
		display: 'standalone',
		orientation: 'portrait'
	}
}
