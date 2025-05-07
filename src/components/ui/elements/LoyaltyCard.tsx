'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, CircleCheckBig, Sparkles, X } from 'lucide-react'

import { useGetLoyaltyByAccountQuery } from '@/shared/api/hooks/loyalty/useGetLoyaltyByAccountQuery'
import { useGetNextLevelLoyaltyAccountQuery } from '@/shared/api/hooks/loyalty/useGetNextLelevLoyaltyAccountQuery'

import { Typography } from '../common'

export function LoyaltyCard() {
	const { data: loyalty } = useGetLoyaltyByAccountQuery()
	const { data: nextLevelLoyalty } = useGetNextLevelLoyaltyAccountQuery()
	const points = loyalty?.data.points ?? 0
	const pointsToNextLevel = loyalty?.data.pointsToNextLevel ?? 0
	const progress = Math.min((points / (points + pointsToNextLevel)) * 100, 100)

	return (
		<div>
			<div className='flex items-center justify-between'>
				<div className='flex flex-col gap-1'>
					<Typography className='text-2xl font-bold'>
						Ваш уровень лояльности : <span className='text-primary'>{loyalty?.data.loyaltyLevel.name}</span>
					</Typography>
					<Typography className='text-sm text-muted-foreground'>Зарабатывайте баллы и получайте преимущества</Typography>
				</div>
				<motion.div whileHover={{ scale: 1.05 }} className='flex flex-col items-center rounded-lg bg-primary/5 p-4'>
					<Typography className='text-4xl font-bold text-primary'>{points}</Typography>
					<Typography className='text-sm text-muted-foreground'>баллов</Typography>
				</motion.div>
			</div>

			<div className='mb-8'>
				<div className='mb-2 flex items-center justify-between'>
					<Typography className='font-medium'>Прогресс до следующего уровня</Typography>
					<div className='flex items-center gap-2'>
						<Typography className='font-bold text-primary'>{Math.round(progress)}%</Typography>
						<Sparkles className='h-4 w-4 text-primary' />
					</div>
				</div>

				<div className='relative h-3 w-full overflow-hidden rounded-full bg-muted/50'>
					<motion.div
						initial={{ width: 0 }}
						animate={{ width: `${progress}%` }}
						transition={{ duration: 1, ease: 'easeOut' }}
						className='absolute inset-0 bg-gradient-to-r from-primary to-primary/60'
					/>
					<motion.div
						animate={{
							background: [
								'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
								'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
							]
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							repeatType: 'reverse'
						}}
						className='absolute inset-0'
					/>
				</div>

				<Typography className='mt-2 text-sm text-muted-foreground'>
					До следующего уровня осталось: <span className='font-medium text-primary'>{pointsToNextLevel} баллов</span>
				</Typography>
			</div>

			{/* Benefits Section */}
			<div className='grid gap-6 md:grid-cols-2'>
				{/* Current Benefits */}
				<div>
					<Typography className='mb-4 text-lg font-semibold'>Текущие преимущества</Typography>
					<ul className='space-y-3'>
						{loyalty?.data.loyaltyLevel?.additionalBenefits?.map((benefit, index) => (
							<motion.li
								key={index}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.1 }}
								whileHover={{ x: 5 }}
								className='flex items-center gap-3 rounded-lg bg-muted/30 p-3'>
								{benefit.isActive ? <CircleCheckBig className='h-5 w-5 text-green-500' /> : <X className='h-5 w-5 text-red-500' />}
								<div className='flex flex-col'>
									<Typography className='font-medium'>{benefit.name}</Typography>
									<Typography className='text-sm text-muted-foreground'>{benefit.description}</Typography>
								</div>
							</motion.li>
						))}
					</ul>
				</div>

				{/* Next Level Benefits */}
				<AnimatePresence>
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 20 }}
						className='rounded-lg border border-primary/20 bg-primary/5 p-4'>
						<div className='mb-4 flex items-center gap-2'>
							<ChevronRight className='h-5 w-5 text-primary' />
							<Typography className='text-lg font-semibold text-primary'>Следующий уровень</Typography>
						</div>
						<ul className='space-y-3'>
							{nextLevelLoyalty?.data.additionalBenefits?.map((benefit, index) => (
								<motion.li
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
									className='flex items-center gap-3 rounded-lg bg-background/50 p-3'>
									<CircleCheckBig className='h-5 w-5 text-primary' />
									<div className='flex flex-col'>
										<Typography className='font-medium'>{benefit.name}</Typography>
										<Typography className='text-sm text-muted-foreground'>{benefit.description}</Typography>
									</div>
								</motion.li>
							))}
						</ul>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	)
}
