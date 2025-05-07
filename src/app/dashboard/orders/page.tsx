import { Heading } from '@/components/ui/common'
import { Stepper, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/elements/Stepper'

import { OrderList } from './(components)/OrderList'

export default function OrdersPage() {
	return (
		<div className='container mx-auto space-y-6 py-6'>
			<Heading title='История заказов' description='Просмотр и управление вашими заказами' />
			<OrderList />
		</div>
	)
}
