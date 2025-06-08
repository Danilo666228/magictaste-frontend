import { Cake, Edit } from 'lucide-react'
import { useState } from 'react'

import { Modal } from '@/components/shared'
import { Button, Card, CardContent, CardHeader, CardTitle, Typography } from '@/components/ui/common'

import { LoyaltyLevel } from '@/shared/api/types/loyalty'

import { LoyaltyForm } from './LoyaltyForm'

interface LoyaltyLevelCardProps {
	loyaltyLevel: LoyaltyLevel
}

export function LoyaltyLevelCard({ loyaltyLevel }: LoyaltyLevelCardProps) {
	const [open, setOpen] = useState<boolean>(false)
	return (
		<>
			<Card className='min-h-[300px]'>
				<CardHeader className='flex flex-row items-center gap-3 bg-muted/50'>
					<div className='w-fit rounded-full bg-primary p-2'>
						<Cake className='' />
					</div>
					<CardTitle className='text-xl'>{loyaltyLevel.name}</CardTitle>
					<Modal
						title='Редактирование лояльности'
						trigger={
							<Button size={'icon'} variant={'outline'} className='ml-auto'>
								<Edit />
							</Button>
						}
						open={open}
						onOpenChange={setOpen}>
						<LoyaltyForm
							initialDate={{ title: loyaltyLevel.name, minPoints: loyaltyLevel.minPoints, percent: loyaltyLevel.bonusPercentage }}
						/>
					</Modal>
				</CardHeader>
				<CardContent className='mt-4 flex flex-col gap-3 text-lg'>
					<Typography className='font-semibold'>Минимальное количество баллов : {loyaltyLevel.minPoints}</Typography>
					<Typography className='font-semibold'>Бонус скидки в процентах : {loyaltyLevel.bonusPercentage}</Typography>
				</CardContent>
			</Card>
		</>
	)
}
