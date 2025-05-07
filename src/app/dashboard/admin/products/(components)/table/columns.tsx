import { ColumnDef } from '@tanstack/react-table'
import { useFormatter } from 'next-intl'

import { Avatar, AvatarFallback, AvatarImage, Badge, Checkbox } from '@/components/ui/common'
import { SortableHeader } from '@/components/ui/elements/table/SortableHeader'

import { Product } from '@/shared/api/types'

import { ProductsActions } from './ProductAction'
import { getMediaSource } from '@/lib/utils'

export interface ProductColumn extends Product {
	actions?: string
}

export const columns: ColumnDef<ProductColumn>[] = [
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
				<Avatar className='mx-auto h-[44px] w-[44px]'>
					<AvatarImage src={getMediaSource(getValue<string>())} />
					<AvatarFallback className='text-sm'>{'Фото не найдено'}</AvatarFallback>
				</Avatar>
			)
		},
		header: ({ column }) => <SortableHeader column={column}>Изображение</SortableHeader>
	},
	{
		accessorKey: 'price',
		cell: ({ getValue }) => {
			const formatted = useFormatter()
			return formatted.number(getValue<number>())
		},
		header: ({ column }) => <SortableHeader column={column}>Цена</SortableHeader>
	},
	{
		accessorKey: 'weight',
		cell: ({ getValue }) => getValue<number>() || 'Отсутствует',
		header: ({ column }) => <SortableHeader column={column}>Вес</SortableHeader>
	},
	{
		accessorKey: 'category.title',
		header: ({ column }) => <SortableHeader column={column}>Категория</SortableHeader>
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
		accessorKey: 'onSale',
		cell: ({ getValue }) =>
			getValue<boolean>() ? <Badge variant='outline'>В продаже</Badge> : <Badge variant='destructive'>Не в продаже</Badge>,
		header: ({ column }) => <SortableHeader column={column}>В продаже</SortableHeader>
	},
	{
		accessorKey: 'actions',
		header: 'Действие',
		cell: ({ row }) => <ProductsActions row={row} />
	}
]
