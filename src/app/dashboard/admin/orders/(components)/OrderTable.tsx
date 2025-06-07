'use client'

import { columns } from './columns'
import { DataTable } from '@/components/ui/elements/table/DataTable'
import { useGetOrdersQuery } from '@/shared/api/hooks/order/useGetOrdersQuery'
import { useState } from 'react'

export function OrderTable() {
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const { data: orders } = useGetOrdersQuery({
		config: {
			params: {
				page,
				limit: pageSize
			}
		}
	})

	return (
		<DataTable
			columns={columns}
			data={orders?.data ?? []}
			totalCount={orders?.data.length}
			onPageChange={setPage}
			onPageSizeChange={setPageSize}
			pageSize={pageSize}
			page={page}
			filterKey='lastName'
		/>
	)
}
