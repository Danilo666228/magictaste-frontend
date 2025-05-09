import { AlertTriangle, CheckCircle, Clock, LucideIcon, Package, RefreshCcw, Truck, XCircle } from 'lucide-react'

import { OrderStatus } from '@/shared/api/types'

interface StatusInfo {
	icon: LucideIcon
	label: string
	bgColor: string
	textColor: string
}

export const statusInfo: Record<OrderStatus, StatusInfo> = {
	WAITING_FOR_PAYMENT: {
		icon: Clock,
		label: 'Ожидает оплаты',
		bgColor: 'bg-amber-50',
		textColor: 'text-amber-700'
	},
	PAYED: {
		icon: CheckCircle,
		label: 'Оплачен',
		bgColor: 'bg-green-50',
		textColor: 'text-green-700'
	},
	CANCELED: {
		icon: XCircle,
		label: 'Отменен',
		bgColor: 'bg-red-50',
		textColor: 'text-red-700'
	},
	PROCESSING: {
		icon: RefreshCcw,
		label: 'В обработке',
		bgColor: 'bg-blue-50',
		textColor: 'text-blue-700'
	},
	COMPLETED: {
		icon: CheckCircle,
		label: 'Завершен',
		bgColor: 'bg-green-50',
		textColor: 'text-green-700'
	},
	DELIVERING: {
		icon: Truck,
		label: 'Доставляется',
		bgColor: 'bg-indigo-50',
		textColor: 'text-indigo-700'
	},
	READY_FOR_DELIVERY: {
		icon: Package,
		label: 'Готов к доставке',
		bgColor: 'bg-purple-50',
		textColor: 'text-purple-700'
	},
	RETURNED: {
		icon: AlertTriangle,
		label: 'Возвращен',
		bgColor: 'bg-orange-50',
		textColor: 'text-orange-700'
	}
}
