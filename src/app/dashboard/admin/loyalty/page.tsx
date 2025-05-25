import { Heading } from '@/components/ui/common'

import { LoyaltyForm } from './components/LoyaltyForm'
import { CarouselLotalty } from './components/CarouselLotalty'

export default function LoyaltyPage() {
	return (
		<>
			<Heading title='Система лояльности' description='Управление системой лояльности' />
			<div className='grid grid-cols-2 gap-5'>
				<LoyaltyForm />
				<CarouselLotalty />
			</div>
		</>
	)
}
