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

import { useConfig } from '@/shared/utils/contexts'
import { fonts } from '@/shared/utils/contexts/config/utils/fonts'

export function ChangeFontSettings() {
	const { font } = useConfig()

	return (
		<Card>
			<CardHeader className='bg-muted/50'>
				<div className='flex items-center gap-3'>
					<div className='rounded-full bg-primary/15 p-2'>
						<TypeOutline className='text-primary' />
					</div>
					<div>
						<CardTitle className='text-xl'>Настройки шрифта</CardTitle>
						<CardDescription>Выберите предпочитаемый шрифт для вашего приложения</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className='space-y-6 p-6'>
				<div className='space-y-2'>
					<Label>Семейство шрифта</Label>
					<Select value={font.family} onValueChange={font.setFamily}>
						<SelectTrigger>
							<SelectValue placeholder='Выберите шрифт' />
						</SelectTrigger>
						<SelectContent>
							{Object.entries(fonts).map(([key, font]) => (
								<SelectItem key={key} value={font.value}>
									{font.value}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className='rounded-lg border p-4'>
					<p className='text-muted-foreground'>Пример текста с выбранными настройками</p>
				</div>
			</CardContent>
		</Card>
	)
}
