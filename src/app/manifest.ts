import type { MetadataRoute } from 'next'

import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants/seo.constants'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: SITE_NAME,
		description: SITE_DESCRIPTION,
		start_url: '/auth/sign-in',
		display: 'standalone',
		orientation : 'portrait',
		icons: [
			{
				src: '/favicon-192x192.png',
				sizes: '192x192',
				type: 'image/png'
			},
			{
				src: '/favicon-512x512.png',
				sizes: '512x512',
				type: 'image/png'
			}
		]
	}
}
