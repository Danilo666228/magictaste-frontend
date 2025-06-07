import { Heading } from '@/components/ui/common'

import { OrderList } from './(components)/OrderList'

export default function OrdersPage() {
	return (
		<div className='container mx-auto space-y-6 py-6'>
			<Heading title='История заказов' description='Просмотр и управление вашими заказами' />
			<OrderList />
		</div>
	)
}
