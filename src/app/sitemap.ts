import type { MetadataRoute } from 'next'

import { CLIENT_URL } from '@/lib/constants/url.constants'

import { api } from '@/shared/api/instance'
import { Category } from '@/shared/api/types'

// async function getCategories() {
// 	try {
// 		return await api.get<{ categories: Category[]; total: number }>('/category')
// 	} catch (error) {
// 		console.error('Failed to fetch categories:', error)
// 		return { data: { categories: [], total: 0 } }
// 	}
// }

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// const categoriesResponse = await getCategories()
	// const categories = categoriesResponse.data.categories

	const routes: MetadataRoute.Sitemap = [
		// {
		// 	url: CLIENT_URL,
		// 	lastModified: new Date().toISOString(),
		// 	priority: 1.0
		// },
		// {
		// 	url: CLIENT_URL + '/menu',
		// 	lastModified: new Date().toISOString(),
		// 	priority: 0.8
		// },
		// {
		// 	url: CLIENT_URL + '/about',
		// 	lastModified: new Date().toISOString(),
		// 	priority: 0.7
		// }
	]

	// categories.forEach(category => {
	// 	routes.push({
	// 		url: CLIENT_URL + `/menu/${category.id}`,
	// 		lastModified: new Date(category.createdAt).toISOString(),
	// 		priority: 0.7
	// 	})
	// })

	return routes
}

