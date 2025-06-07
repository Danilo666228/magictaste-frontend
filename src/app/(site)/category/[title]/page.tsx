import { Category } from './(components)/Category'
import { api } from '@/shared/api/instance'
import { Category as CategoryType } from '@/shared/api/types/category'
import { Metadata } from 'next'

type Params = Promise<{ title: string }>

async function getCategory(title: string) {
	return await api.get<CategoryType>(`/category/title/${title}`)
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { title } = await params
	const category = await getCategory(title)
	return {
		title: category.data.title
	}
}

export default async function CategoryPage({ params }: { params: Promise<{ title: string }> }) {
	const { title } = await params
	const category = await getCategory(title)
	return <Category category={category.data} />
}
