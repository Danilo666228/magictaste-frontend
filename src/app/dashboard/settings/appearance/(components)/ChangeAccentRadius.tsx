'use client'

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Slider } from '@/components/ui/common'
import { cn } from '@/shared/hooks/helpers'
import { RoundedRadius, useConfig } from '@/shared/utils/contexts'
import { getRadiusName, getRadiusValue } from '@/shared/utils/contexts/config/utils/radius'
import { SquareRoundCorner } from 'lucide-react'

const presets = [
	{ name: 'Квадрат', value: 'sm' },
	{ name: 'Скругленный', value: 'lg' },
	{ name: 'Круглый', value: 'full' }
] as const

export function ChangeAccentRadius() {
	const { rounded } = useConfig()

	const handleRadiusChange = (value: number[]) => {
		const radiusName = getRadiusName(value[0])
		rounded.setRadius(radiusName)
	}
	console.log(rounded)

	return (
		<Card>
			<CardHeader className='bg-muted/50'>
				<div className='flex items-center gap-3'>
					<div className='rounded-full bg-primary/15 p-2'>
						<SquareRoundCorner className='text-primary' />
					</div>
					<div>
						<CardTitle className='text-xl'>Закругление углов</CardTitle>
						<CardDescription>Выберите предпочитаемый радиус закругления для вашего приложения</CardDescription>
					</div>
				</div>
			</CardHeader>

			<CardContent className='flex flex-col gap-5 p-6'>
				<div className='flex gap-3'>
					{presets.map(preset => (
						<Button
							key={preset.value}
							variant='outline'
							onClick={() => rounded.setRadius(preset.value as RoundedRadius)}
							className={cn('flex-1 shadow-sm transition-all duration-200', rounded.radius === preset.value && 'border-primary')}>
							{preset.name}
						</Button>
					))}
				</div>
				<Slider
					value={[getRadiusValue(rounded.radius)]}
					defaultValue={[getRadiusValue(rounded.radius)]}
					min={4}
					max={26}
					step={4}
					onValueChange={handleRadiusChange}
				/>
				<div className='flex justify-between text-sm text-muted-foreground'>
					<span className='opacity-70'>4px</span>
					<div className='rounded-md bg-muted px-2.5 py-1 font-medium text-foreground'>{getRadiusValue(rounded.radius)}px</div>
					<span className='opacity-70'>26px</span>
				</div>

				<div className='flex gap-3'>
					<Button className='flex-1 shadow-sm transition-all duration-200 hover:shadow-md'>Пример кнопки</Button>
					<Button variant='outline' className='flex-1 shadow-sm transition-all duration-200 hover:bg-accent/10'>
						Пример кнопки
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
