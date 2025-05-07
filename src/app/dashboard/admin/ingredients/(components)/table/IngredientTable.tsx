'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/common'
import { FormModal } from '@/components/ui/elements/modal/FormModal/FormModal'
import { DataTable } from '@/components/ui/elements/table/DataTable'

import { useGetIngredientsQuery } from '@/shared/api/hooks/ingredient/useGetIngredientsQuery'

import { IngredientForm } from './IngredientForm'
import { columns } from './columns'

export function IngredientTable() {
	const [pageSize, setPageSize] = useState(10)
	const [page, setPage] = useState(1)
	const { data: ingredients, isLoading } = useGetIngredientsQuery({
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
			title='Ингредиенты'
			filterKey='title'
			isLoading={isLoading}
			columns={columns}
			data={ingredients?.data}
			page={page}
			onPageChange={setPage}
			onPageSizeChange={setPageSize}
			pageSize={pageSize}
			totalCount={ingredients?.data.length}
			createModal={
				<FormModal
					title='Добавление ингредиента'
					description='Добавление ингредиента'
					renderForm={() => <IngredientForm mode='create' />}
					trigger={
						<Button variant={'outline'}>
							<Plus /> Добавить ингредиент
						</Button>
					}
					isOpen={isOpen.create}
					onOpenChange={() => setIsOpen({ ...isOpen, create: !isOpen.create })}
				/>
			}
			editModal={ingredient => (
				<FormModal
					title='Редактирование ингредиента'
					description='Редактирование ингредиента'
					renderForm={() => <IngredientForm mode='edit' initialData={ingredient} />}
					trigger={<Button variant={'outline'}>Редактировать</Button>}
					isOpen={isOpen.edit}
					onOpenChange={() => setIsOpen({ ...isOpen, edit: !isOpen.edit })}
				/>
			)}
		/>
	)
}
