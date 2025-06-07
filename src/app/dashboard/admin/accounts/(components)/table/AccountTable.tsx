'use client'

import { columns } from './columns'
import { DataTable } from '@/components/ui/elements/table/DataTable'
import { useGetAccountsQuery } from '@/shared/api/hooks/account/useGetAccountsQuery'
import { useState } from 'react'

export function AccountTable() {
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const { data: accounts } = useGetAccountsQuery({
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
			data={accounts?.data}
			filterKey='userName'
			onPageChange={setPage}
			onPageSizeChange={setPageSize}
			totalCount={accounts?.data.length}
			pageSize={pageSize}
			page={page}
		/>
	)
}
