import { Heading } from '@/components/ui/common'

import { Loyalty } from './components/Loyalty'

export default function LoyaltyPage() {
	return (
		<>
			<Heading title='Система лояльности' description='Управление системой лояльности' />
			<Loyalty />
		</>
	)
}
