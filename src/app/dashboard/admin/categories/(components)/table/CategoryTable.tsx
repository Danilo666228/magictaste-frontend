'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/common'
import { FormModal } from '@/components/ui/elements/modal/FormModal/FormModal'
import { DataTable } from '@/components/ui/elements/table/DataTable'

import { useGetCategoryQuery } from '@/shared/api/hooks/category/useGetCategoryQuery'

import { CategoryForm } from '../CategoryForm'

import { columns } from './columns'

export function CategoryTable() {
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const { data: categories, isLoading } = useGetCategoryQuery({
		config: {
			params: {
				page,
				limit: pageSize
			}
		}
	})
	const [isOpen, setIsOpen] = useState({
		create: false,
		edit: false
	})
	return (
		<DataTable
			filterKey='title'
			title='Категории'
			isLoading={isLoading}
			columns={columns}
			data={categories?.data ?? []}
			page={page}
			onPageChange={setPage}
			onPageSizeChange={setPageSize}
			pageSize={pageSize}
			totalCount={categories?.data.length}
			createModal={
				<FormModal
					title='Добавление категории'
					renderForm={() => <CategoryForm mode='create' />}
					trigger={
						<Button variant='outline'>
							<Plus /> Добавить категорию
						</Button>
					}
					isOpen={isOpen.create}
					onOpenChange={() => setIsOpen({ ...isOpen, create: !isOpen.create })}
				/>
			}
			editModal={category => (
				<FormModal
					title='Редактирование категории'
					renderForm={() => <CategoryForm mode='edit' initialData={category} />}
					trigger={<Button variant='outline'>Редактировать</Button>}
					isOpen={isOpen.edit}
					onOpenChange={() => setIsOpen({ ...isOpen, edit: !isOpen.edit })}
				/>
			)}
		/>
	)
}
