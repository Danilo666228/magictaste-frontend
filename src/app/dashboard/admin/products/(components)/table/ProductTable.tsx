'use client'

import { Pencil, Plus } from 'lucide-react'
import { useState } from 'react'

import { Button, Typography } from '@/components/ui/common'
import { FormModal } from '@/components/ui/elements/modal/FormModal/FormModal'
import { DataTable } from '@/components/ui/elements/table/DataTable'

import { useGetProductsQuery } from '@/shared/api/hooks/products/useGetProductsQuery'

import { ProductForm } from '../ProductForm'

import { columns } from './columns'

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
		options : {
			
		}
	})

	const [isOpen, setIsOpen] = useState({
		create: false,
		edit: false
	})

	return (
		<DataTable
			title='Продукты'
			columns={columns}
			data={products?.data.products}
			filterKey='title'
			isLoading={isLoading}
			editModal={product => (
				<FormModal
					title='Редактирование продукта'
					description='Редактирование продукта'
					renderForm={() => <ProductForm mode='edit' initialData={product} />}
					trigger={<Button variant='outline'>Редактировать</Button>}
					isOpen={isOpen.edit}
					onOpenChange={() => setIsOpen({ ...isOpen, edit: !isOpen.edit })}
				/>
			)}
			createModal={
				<FormModal
					title='Создание продукта'
					description='Создание продукта'
					renderForm={() => <ProductForm mode='create' />}
					trigger={
						<Button variant='outline'>
							<Plus /> Добавить продукт
						</Button>
					}
					isOpen={isOpen.create}
					onOpenChange={() => setIsOpen({ ...isOpen, create: !isOpen.create })}
				/>
			}
			onPageChange={setPage}
			onPageSizeChange={setPageSize}
			totalCount={products?.data.total}
			pageSize={pageSize}
			page={page}
		/>
	)
}
