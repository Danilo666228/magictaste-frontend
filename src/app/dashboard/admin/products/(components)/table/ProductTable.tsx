'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/common'
import { DataTable } from '@/components/ui/elements/table/DataTable'

import { useGetProductsQuery } from '@/shared/api/hooks/products/useGetProductsQuery'

import { ProductForm } from '../ProductForm'

import { columns } from './columns'
import { Modal } from '@/components/ui/elements/modal/Default/Modal'

export function ProductTable() {
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)

	const { data: products, isLoading } = useGetProductsQuery({
		config: {
			params: {
				page: page,
				limit: pageSize
			}
		},
		options: {}
	})

	const [isOpen, setIsOpen] = useState({
		create: false,
		edit: false
	})

	return (
		<DataTable
			title="Продукты"
			columns={columns}
			data={products?.data.products}
			filterKey="title"
			isLoading={isLoading}
			editModal={product => (
				<Modal
					title="Редактирование продукта"
					trigger={<Button variant="outline">Редактировать</Button>}
					open={isOpen.edit}
					onOpenChange={() => setIsOpen({ ...isOpen, edit: !isOpen.edit })}>
					<ProductForm mode="edit" initialData={product} />
				</Modal>
			)}
			createModal={
				<Modal
					title="Добавление продукта"
					trigger={
						<Button variant="outline">
							<Plus /> Добавить продукт
						</Button>
					}
					open={isOpen.create}
					onOpenChange={() => setIsOpen({ ...isOpen, create: !isOpen.create })}>
					<ProductForm mode="create" />
				</Modal>
			}
			onPageChange={setPage}
			onPageSizeChange={setPageSize}
			totalCount={products?.data.total}
			pageSize={pageSize}
			page={page}
		/>
	)
}
