import type { MetadataRoute } from 'next'

import { CLIENT_URL } from '@/lib/constants/url.constants'

import { api } from '@/shared/api/instance'
import type { Category } from '@/shared/api/types'

async function getCategories() {
	return await api.get<{ categories: Category[]; total: number }>(`/category`)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const categories = await getCategories()

	const routes: MetadataRoute.Sitemap = [
		{
			url: CLIENT_URL,
			lastModified: new Date().toISOString(),
			priority: 1.0
		},
		{
			url: CLIENT_URL + '/menu',
			lastModified: new Date().toISOString(),
			priority: 0.8
		},
		{
			url: CLIENT_URL + '/about',
			lastModified: new Date().toISOString(),
			priority: 0.7
		}
	]

	categories.data.categories.forEach(category => {
		routes.push({
			url: CLIENT_URL + `/menu/${category.id}`,
			lastModified: category.createdAt,
			priority: 0.7
		})
	})

	return routes
}
