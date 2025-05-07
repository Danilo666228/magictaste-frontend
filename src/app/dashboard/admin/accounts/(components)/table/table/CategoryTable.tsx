import { useState } from 'react'

import { Button } from '@/components/ui/common'
import { FormModal } from '@/components/ui/elements/modal/FormModal/FormModal'
import { DataTable } from '@/components/ui/elements/table/DataTable'

import { useGetCategoryQuery } from '@/shared/api/hooks/category/useGetCategoryQuery'

import { CategoryForm } from './CategoryForm'
import { columns } from './columns'

export function CategoryTable() {
	const { data: categories, isLoading } = useGetCategoryQuery()
	const [isOpen, setIsOpen] = useState({
		create: false,
		edit: false
	})
	return (
		<DataTable
			filterKey='title'
			isLoading={isLoading}
			columns={columns}
			data={categories?.data ?? []}
			createModal={
				<FormModal
					title='Добавление категории'
					description='Добавление категории'
					renderForm={() => <CategoryForm mode='create' />}
					trigger={<Button variant='outline'>Создать</Button>}
					isOpen={isOpen.create}
					onOpenChange={() => setIsOpen({ ...isOpen, create: !isOpen.create })}
				/>
			}
			editModal={category => (
				<FormModal
					title='Редактирование категории'
					description='Редактирование категории'
					renderForm={() => <CategoryForm mode='edit' initialData={category} />}
					trigger={<Button variant='outline'>Редактировать</Button>}
					isOpen={isOpen.edit}
					onOpenChange={() => setIsOpen({ ...isOpen, edit: !isOpen.edit })}
				/>
			)}
		/>
	)
}
