import { Column } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/common'
import { ReactNode } from 'react'

interface SortableHeaderProps<T> {
	column: Column<T>
	children: ReactNode
}

export function SortableHeader<T>({ column, children }: SortableHeaderProps<T>) {
	return (
		<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
			{children}
			<ArrowUpDown className="ml-2 h-4 w-4" />
		</Button>
	)
}
