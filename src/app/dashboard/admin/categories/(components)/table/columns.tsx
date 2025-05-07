import { ColumnDef } from '@tanstack/react-table'
import { useFormatter } from 'next-intl'

import { Avatar, AvatarFallback, AvatarImage, Checkbox } from '@/components/ui/common'
import { SortableHeader } from '@/components/ui/elements/table/SortableHeader'

import { Category } from '@/shared/api/types'

import { CategoryActions } from './CategoryAction'
import { getMediaSource } from '@/lib/utils/getMediaSource'

export interface CategoryColumn extends Category {
	actions?: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
				onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox checked={row.getIsSelected()} onCheckedChange={value => row.toggleSelected(!!value)} aria-label='Select row' />
		),
		size: 28,
		enableSorting: false,
		enableHiding: false
	},

	{
		accessorKey: 'title',
		header: ({ column }) => <SortableHeader column={column}>Название</SortableHeader>
	},
	{
		accessorKey: 'createdAt',
		cell: ({ getValue }) => {
			const formatted = useFormatter()
			return formatted.dateTime(new Date(getValue<string>()))
		},
		header: ({ column }) => <SortableHeader column={column}>Дата создания</SortableHeader>
	},
	{
		accessorKey: 'updatedAt',
		cell: ({ getValue }) => {
			const formatted = useFormatter()
			return formatted.dateTime(new Date(getValue<string>()))
		},
		header: ({ column }) => <SortableHeader column={column}>Дата обновления</SortableHeader>
	},
	{
		accessorKey: 'actions',
		header: 'Действие',
		cell: ({ row }) => <CategoryActions row={row} />
	}
]
