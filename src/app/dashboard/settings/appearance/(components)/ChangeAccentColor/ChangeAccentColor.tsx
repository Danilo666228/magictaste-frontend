'use client'

import { Check, Paintbrush } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Typography } from '@/components/ui/common'

import { cn } from '@/shared/hooks/helpers'
import { useConfig } from '@/shared/utils/contexts'
import { AccentColors } from '@/shared/utils/contexts/config/utils/accent-colors'

import { availableColor } from './availableColors'

export function ChangeAccentColor() {
	const { accent } = useConfig()
	const { theme } = useTheme()
	return (
		<Card className=''>
			<CardHeader className='bg-muted/50'>
				<div className='flex items-center gap-3'>
					<div className='rounded-full bg-primary/15 p-2'>
						<Paintbrush className='text-primary' />
					</div>
					<div>
						<CardTitle className='text-xl'>Акцентный цвет</CardTitle>
						<CardDescription>Выберите предпочитаемый акцентный цвет для вашего приложения</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className='p-6'>
				<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
					{availableColor.map((color, index) => {
						const isActive = accent.color === color.name

						return (
							<Button
								className={cn(
									'flex h-[60px] cursor-pointer items-center justify-start gap-3 border',
									isActive && 'bg-primary/10 shadow-inner'
								)}
								key={index}
								onClick={() => accent.setColor?.(color.name as AccentColors)}
								variant={'ghost'}>
								<div className={cn('size-6 rounded-full shadow-sm', theme === 'light' ? color.light : color.dark)} />
								<Typography className='text-sm font-medium'>{color.label}</Typography>
								{isActive && (
									<div className='ml-auto flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground'>
										<Check className='size-3.5' />
									</div>
								)}
							</Button>
						)
					})}
				</div>
			</CardContent>
		</Card>
	)
}
