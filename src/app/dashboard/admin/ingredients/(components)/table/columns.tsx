import { Column, ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { useFormatter } from 'next-intl'

import { Avatar, AvatarFallback, AvatarImage, Button, Checkbox } from '@/components/ui/common'

import { Ingredient } from '@/shared/api/types'

import { IngredientActions } from './IngredientAction'
import { getMediaSource } from '@/lib/utils'

export interface IngredientColumn extends Ingredient {
	actions?: string
}

const SortableHeader = ({ column, children }: { column: Column<IngredientColumn, unknown>; children: React.ReactNode }) => (
	<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
		{children}
		<ArrowUpDown />
	</Button>
)

export const columns: ColumnDef<IngredientColumn>[] = [
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
		accessorKey: 'imageUrl',
		cell: ({ getValue }) => {
			return (
				<Avatar className='mx-auto h-[40px] w-[40px]'>
					<AvatarImage className='bg-transparent mix-blend-normal' src={getMediaSource(getValue<string>())} />
					<AvatarFallback className='text-sm'>{'Фото не найдено'}</AvatarFallback>
				</Avatar>
			)
		},
		header: ({ column }) => <SortableHeader column={column}>Изображение</SortableHeader>
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
		cell: ({ row }) => <IngredientActions row={row} />
	}
]
