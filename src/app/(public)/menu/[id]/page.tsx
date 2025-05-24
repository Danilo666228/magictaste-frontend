import { Metadata } from 'next'

import { api } from '@/shared/api/instance'
import { Category as CategoryType } from '@/shared/api/types/category'

import { Category } from './(components)/Category'

type Params = Promise<{ id: string }>

async function getCategory(id: string) {
	return await api.get<CategoryType>(`/category/${id}`)
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { id } = await params
	const category = await getCategory(id)
	return {
		title: category.data.title
	}
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const category = await getCategory(id)
	return <Category category={category.data} />
}
