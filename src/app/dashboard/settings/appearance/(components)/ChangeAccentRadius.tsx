'use client'

import { SquareRoundCorner } from 'lucide-react'

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Slider } from '@/components/ui/common'

import { useConfig } from '@/hooks/useConfig'

export function ChangeAccentRadius() {
	const { accentRadius, setAccentRadius } = useConfig()

	const handleRadiusChange = (value: number[]) => {
		setAccentRadius(value[0])
	}

	const presets = [
		{ name: 'Квадрат', value: 0 },
		{ name: 'Скругленный', value: 8 },
		{ name: 'Круглый', value: 20 }
	]

	return (
		<Card>
			<CardHeader className='bg-muted/50'>
				<div className='flex items-center gap-3'>
					<div className='rounded-full bg-primary/15 p-2'>
						<SquareRoundCorner className='text-primary' />
					</div>
					<div>
						<CardTitle className='text-xl font-medium'>Закругление углов</CardTitle>
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
							onClick={() => setAccentRadius(preset.value)}
							className={`flex-1 shadow-sm transition-all duration-200 ${
								accentRadius === preset.value ? 'border-accent bg-accent/10' : ''
							}`}>
							{preset.name}
						</Button>
					))}
				</div>
				<Slider value={[accentRadius]} defaultValue={[accentRadius]} max={20} step={1} onValueChange={handleRadiusChange} />
				<div className='flex justify-between text-sm text-muted-foreground'>
					<span className='opacity-70'>0px</span>
					<div className='rounded-md bg-muted px-2.5 py-1 font-medium text-foreground'>{accentRadius}px</div>
					<span className='opacity-70'>20px</span>
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
