import { CLIENT_URL } from '@/shared/utils/constants'
import type { MetadataRoute } from 'next'

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
