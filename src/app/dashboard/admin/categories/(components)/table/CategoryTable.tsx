'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/common'
import { DataTable } from '@/components/ui/elements/table/DataTable'

import { useGetCategoryQuery } from '@/shared/api/hooks/category/useGetCategoryQuery'

import { CategoryForm } from '../CategoryForm'

import { columns } from './columns'
import { Modal } from '@/components/ui/elements/modal/Default/Modal'

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
			filterKey="title"
			title="Категории"
			isLoading={isLoading}
			columns={columns}
			data={categories?.data.categories ?? []}
			page={page}
			onPageChange={setPage}
			onPageSizeChange={setPageSize}
			pageSize={pageSize}
			totalCount={categories?.data.total}
			createModal={
				<Modal title={'Добавление категории'}
							 trigger={
								 <Button variant="outline">
									 <Plus /> Добавить категорию
								 </Button>
							 }
							 open={isOpen.create}
							 onOpenChange={() => setIsOpen({ ...isOpen, create: !isOpen.create })}>
					<CategoryForm mode="create" />
				</Modal>
			}
			editModal={category => (
				<Modal title={'Редактировать категорию'}
							 trigger={
								 <Button variant="outline">
									 Редактировать
								 </Button>
							 }
							 open={isOpen.create}
							 onOpenChange={() => setIsOpen({ ...isOpen, edit: !isOpen.edit })}>
					<CategoryForm mode="edit" initialData={category} />
				</Modal>
			)}
		/>
	)
}
