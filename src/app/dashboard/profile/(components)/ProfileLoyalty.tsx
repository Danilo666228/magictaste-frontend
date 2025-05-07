import { Cake } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/common'
import { LoyaltyCard } from '@/components/ui/elements/LoyaltyCard'

export function ProfileLoyalty() {
	return (
		<Card>
			<CardHeader className='bg-muted/50'>
				<div className='flex items-center gap-2'>
					<div className='rounded-full bg-primary/10 p-2'>
						<Cake className='text-primary' size={24} />
					</div>
					<CardTitle className='text-xl'>Ваша программа лояльности</CardTitle>
				</div>
			</CardHeader>
			<CardContent className='p-6'>
				<LoyaltyCard />
			</CardContent>
		</Card>
	)
}
