'use client'

import { TypeOutline } from 'lucide-react'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/common'

import { useConfig } from '@/hooks/useConfig'

export function ChangeFontSettings() {
	const { fontSize, fontFamily, setFontSize, setFontFamily } = useConfig()

	const fonts = [
		{ value: 'inter', label: 'Inter' },
		{ value: 'roboto', label: 'Roboto' },
		{ value: 'montserrat', label: 'Montserrat' },
		{ value: 'fira-sans', label: 'Fira Sans' },
		{ value: 'jetBrainsMono', label: 'JetBrains Mono' }
	]

	return (
		<Card>
			<CardHeader className='bg-muted/50'>
				<div className='flex items-center gap-3'>
					<div className='rounded-full bg-primary/15 p-2'>
						<TypeOutline className='text-primary' />
					</div>
					<div>
						<CardTitle className='text-xl font-medium'>Настройки шрифта</CardTitle>
						<CardDescription>Выберите предпочитаемый шрифт для вашего приложения</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className='space-y-6 p-6'>
				<div className='space-y-2'>
					<Label>Семейство шрифта</Label>
					<Select value={fontFamily} onValueChange={setFontFamily}>
						<SelectTrigger>
							<SelectValue placeholder='Выберите шрифт' />
						</SelectTrigger>
						<SelectContent>
							{fonts.map(font => (
								<SelectItem key={font.value} value={font.value}>
									{font.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className='space-y-2'>
					<Label>Размер шрифта</Label>
					{/* <div className='space-y-4'>
						<Slider value={[fontSize]} min={12} max={20} step={1} onValueChange={([value]) => setFontSize(value)} />
						<div className='flex justify-between text-sm'>
							<span>12px</span>
							<span className='text-primary'>{fontSize}px</span>
							<span>20px</span>
						</div>
					</div> */}
				</div>

				<div className='rounded-lg border p-4'>
					<p className='text-muted-foreground'>Пример текста с выбранными настройками</p>
				</div>
			</CardContent>
		</Card>
	)
}
