import { ColumnDef } from '@tanstack/react-table'
import { useFormatter } from 'next-intl'

import { Badge, Checkbox } from '@/components/ui/common'
import { SortableHeader } from '@/components/ui/elements/table/SortableHeader'

import { Order, OrderStatus } from '@/shared/api/types'
import { PaymentMethod } from '@/shared/api/types/payment'

export interface OrderColumn extends Order {
	actions?: string
}

export const columns: ColumnDef<OrderColumn>[] = [
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
		accessorKey: 'lastName',
		header: ({ column }) => <SortableHeader column={column}>Имя</SortableHeader>
	},
	{
		accessorKey: 'email',
		header: ({ column }) => <SortableHeader column={column}>Email</SortableHeader>
	},

	{
		accessorKey: 'phone',
		header: ({ column }) => <SortableHeader column={column}>Телефон</SortableHeader>
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
		accessorKey: 'deliveryType',
		cell: ({ getValue }) => {
			return getValue<string>() === 'COURIER' ? 'Курьер' : 'Самовывоз'
		},
		header: ({ column }) => <SortableHeader column={column}>Тип доставки</SortableHeader>
	},
	{
		accessorKey: 'paymentMethod',
		cell: ({ getValue }) => {
			return getPaymentMethod(getValue<PaymentMethod>())
		},
		header: ({ column }) => <SortableHeader column={column}>Способ оплаты</SortableHeader>
	},
	{
		accessorKey: 'total',
		header: ({ column }) => <SortableHeader column={column}>Сумма заказа</SortableHeader>
	},
	{
		accessorKey: 'status',
		cell: ({ getValue }) => {
			const status = getValue<OrderStatus>()
			const { label, variant } = getStatusConfig(status)
			return <Badge variant={variant}>{label}</Badge>
		},
		header: ({ column }) => <SortableHeader column={column}>Статус</SortableHeader>
	}
]

function getStatus(status: OrderStatus) {
	switch (status) {
		case OrderStatus.WAITING_FOR_PAYMENT:
			return 'Ожидает оплаты'
		case OrderStatus.PAYED:
			return 'Оплачен'
		case OrderStatus.CANCELED:
			return 'Отменен'
		case OrderStatus.PROCESSING:
			return 'В обработке'
		case OrderStatus.COMPLETED:
			return 'Выполнен'
		case OrderStatus.DELIVERING:
			return 'Доставляется'
		case OrderStatus.READY_FOR_DELIVERY:
			return 'Готов к доставке'
	}
}

function getStatusConfig(status: OrderStatus): {
	label: string
	variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'success'
} {
	switch (status) {
		case OrderStatus.WAITING_FOR_PAYMENT:
			return { label: 'Ожидает оплаты', variant: 'outline' }
		case OrderStatus.PAYED:
			return { label: 'Оплачен', variant: 'success' }
		case OrderStatus.CANCELED:
			return { label: 'Отменен', variant: 'destructive' }
		case OrderStatus.PROCESSING:
			return { label: 'В обработке', variant: 'secondary' }
		case OrderStatus.COMPLETED:
			return { label: 'Выполнен', variant: 'success' }
		case OrderStatus.DELIVERING:
			return { label: 'Доставляется', variant: 'secondary' }
		case OrderStatus.READY_FOR_DELIVERY:
			return { label: 'Готов к доставке', variant: 'outline' }
		default:
			throw new Error(`Unhandled status: ${status}`)
	}
}

function getPaymentMethod(method: PaymentMethod) {
	switch (method) {
		case 'CASH':
			return 'Наличные'
		case 'CARD':
			return 'Карта'
	}
}
