import { api } from '@/shared/api/instance'
import { Category } from '@/shared/api/types'
import { CLIENT_URL } from '@/shared/utils/constants'
import type { MetadataRoute } from 'next'

async function getCategories() {
	try {
		return await api.get<{ categories: Category[] }>('/category')
	} catch (error) {
		return { data: { categories: [] } }
	}
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const categoriesResponse = await getCategories()
	const categories = categoriesResponse.data.categories

	const routes: MetadataRoute.Sitemap = [
		{
			url: CLIENT_URL,
			lastModified: new Date().toISOString(),
			priority: 1.0
		},
		{
			url: CLIENT_URL + '/category',
			lastModified: new Date().toISOString(),
			priority: 0.8
		},
		{
			url: CLIENT_URL + '/about',
			lastModified: new Date().toISOString(),
			priority: 0.7
		}
	]

	categories.forEach(category => {
		routes.push({
			url: CLIENT_URL + `/category/${category.title}`,
			lastModified: new Date(category.createdAt).toISOString(),
			priority: 0.7
		})
	})

	return routes
}
