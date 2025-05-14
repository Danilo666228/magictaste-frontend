import { api } from '@/shared/api/instance'
import { Category } from '@/shared/api/types/category'

import { MenuCategory } from './(components)/MenuCategory'

async function getCategory(id: string) {
	return await api.get<Category>(`/category/${id}`)
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const category = await getCategory(id)
	return <MenuCategory category={category.data} />
}
