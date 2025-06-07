import { Loyalty } from './components/Loyalty'
import { Heading } from '@/components/ui/common'

export default function LoyaltyPage() {
	return (
		<>
			<Heading title='Система лояльности' description='Управление системой лояльности' />
			<Loyalty />
		</>
	)
}
