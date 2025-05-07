'use client'

import { Check, Paintbrush } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/common'

import { useConfig } from '@/hooks/useConfig'

import { BASE_COLORS } from '@/lib/constants/color.constats'

export function ChangeAccentColor() {
	const { accentColor, setAccentColor } = useConfig()

	return (
		<Card className=''>
			<CardHeader className='bg-muted/50'>
				<div className='flex items-center gap-3'>
					<div className='rounded-full bg-primary/15 p-2'>
						<Paintbrush className='text-primary' />
					</div>
					<div>
						<CardTitle className='text-xl font-medium'>Акцентный цвет</CardTitle>
						<CardDescription>Выберите предпочитаемый акцентный цвет для вашего приложения</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className='p-6'>
				<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
					{BASE_COLORS.map((color, index) => {
						const isActive = accentColor === color.name

						return (
							<button
								key={index}
								onClick={() => setAccentColor(color.name)}
								className={`group relative flex items-center gap-3 rounded-lg border bg-card p-4 transition-all duration-200 hover:bg-accent/50 hover:shadow-lg ${isActive ? 'border-primary' : 'border-border hover:border-primary/50'} `}>
								<div
									className='size-6 rounded-full shadow-sm'
									style={{
										background: `hsl(${color.color})`
									}}
								/>

								<span className='text-sm font-medium'>{color.label}</span>

								{isActive && (
									<div className='ml-auto flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground'>
										<Check className='size-3.5' />
									</div>
								)}

								<div
									className='absolute inset-0 -z-10 opacity-0 blur transition-opacity group-hover:opacity-10'
									style={{
										backgroundColor: `hsl(${color.color})`
									}}
								/>
							</button>
						)
					})}
				</div>
			</CardContent>
		</Card>
	)
}
