import type { MetadataRoute } from 'next'

import { CLIENT_URL } from '@/lib/constants/url.constants'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: '/dashboard/*'
		},
		sitemap: CLIENT_URL + '/sitemap.xml'
	}
}
