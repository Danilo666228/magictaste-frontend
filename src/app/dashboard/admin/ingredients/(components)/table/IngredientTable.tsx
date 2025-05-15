'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/common'
import { DataTable } from '@/components/ui/elements/table/DataTable'

import { useGetIngredientsQuery } from '@/shared/api/hooks/ingredient/useGetIngredientsQuery'

import { IngredientForm } from './IngredientForm'
import { columns } from './columns'
import { Modal } from '@/components/ui/elements/modal/Default/Modal'

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
			title="Ингредиенты"
			filterKey="title"
			isLoading={isLoading}
			columns={columns}
			data={ingredients?.data.ingredients}
			page={page}
			onPageChange={setPage}
			onPageSizeChange={setPageSize}
			pageSize={pageSize}
			totalCount={ingredients?.data.total}
			createModal={
				<Modal
					title="Добавление ингредиента"
					trigger={
						<Button variant={'outline'}>
							<Plus /> Добавить ингредиент
						</Button>
					}
					open={isOpen.create}
					onOpenChange={() => setIsOpen({ ...isOpen, create: !isOpen.create })}>
					<IngredientForm mode="create" />
				</Modal>
			}
			editModal={ingredient => (
				<Modal
					title="Редактирование ингредиента"
					trigger={<Button variant={'outline'}>Редактировать</Button>}
					open={isOpen.edit}
					onOpenChange={() => setIsOpen({ ...isOpen, edit: !isOpen.edit })}>
					<IngredientForm mode="edit" initialData={ingredient} />
				</Modal>
			)}
		/>
	)
}
