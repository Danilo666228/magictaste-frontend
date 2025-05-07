'use client'

import { Moon, Palette, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRef, useState } from 'react'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Label,
	RadioGroup,
	RadioGroupItem,
	Typography
} from '@/components/ui/common'

import { useMount } from '@/shared/hooks'

import { cn } from '@/lib/utils/twMerge'

export function ChangeThemeForm() {
	const lightThemeRef = useRef<HTMLButtonElement>(null)
	const darkThemeRef = useRef<HTMLButtonElement>(null)
	const systemThemeRef = useRef<HTMLButtonElement>(null)
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)
	useMount(() => {
		setMounted(true)
	})

	if (!mounted) {
		return null
	}
	return (
		<Card>
			<CardHeader className='bg-muted/30'>
				<div className='flex items-center gap-3'>
					<div className='rounded-full bg-primary/15 p-2'>
						<Palette className='text-primary' />
					</div>
					<div>
						<CardTitle className='text-xl font-medium'>Настройки темы</CardTitle>
						<CardDescription>Выберите предпочитаемую тему оформления</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className='p-6'>
				<div className='mb-6 rounded-lg bg-muted/20 p-3'>
					<Typography className='text-sm text-muted-foreground'>
						Выберите светлую или темную тему для интерфейса приложения. Вы можете изменить тему в любое время.
					</Typography>
				</div>

				<RadioGroup defaultValue={theme} onValueChange={value => setTheme(value)} className='grid grid-cols-1 gap-6 md:grid-cols-3'>
					<div className='flex flex-col'>
						<div
							onClick={() => setTheme('light')}
							className={cn(
								'relative flex cursor-pointer flex-col items-center rounded-lg border-2 p-2 transition-all',
								theme === 'light' ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/20'
							)}>
							<div className='absolute right-3 top-3'>
								<Sun className={cn('h-5 w-5', theme === 'light' ? 'text-primary' : 'text-muted-foreground')} />
							</div>
							<div className='flex h-[180px] w-full flex-col gap-3 overflow-hidden rounded-lg bg-[#f8f9fa] p-3'>
								<div className='mb-1 flex items-center gap-2'>
									<div className='flex gap-1'>
										<div className='h-3 w-3 rounded-full bg-[#ff5f57]'></div>
										<div className='h-3 w-3 rounded-full bg-[#febc2e]'></div>
										<div className='h-3 w-3 rounded-full bg-[#28c840]'></div>
									</div>
									<div className='h-2 w-24 rounded-full bg-[#e4e6eb]'></div>
								</div>

								<div className='flex h-full gap-2'>
									<div className='w-1/4 rounded-md bg-[#ecedef] p-2'>
										<div className='mb-2 h-3 w-full rounded-md bg-white'></div>
										<div className='mb-2 h-3 w-full rounded-md bg-white'></div>
										<div className='h-3 w-3/4 rounded-md bg-white'></div>
									</div>

									<div className='flex w-3/4 flex-col gap-2'>
										<div className='h-5 w-3/4 rounded-md bg-[#ecedef]'></div>
										<div className='h-20 rounded-md bg-white p-2 shadow-sm'>
											<div className='mb-2 h-2 w-full rounded-full bg-[#ecedef]'></div>
											<div className='h-2 w-3/4 rounded-full bg-[#ecedef]'></div>
										</div>
										<div className='h-10 rounded-md bg-white p-2 shadow-sm'>
											<div className='h-2 w-1/2 rounded-full bg-[#ecedef]'></div>
										</div>
									</div>
								</div>
							</div>
							<RadioGroupItem ref={lightThemeRef} hidden value='light' id='light' />
							<Label htmlFor='light' className={cn('mt-3 cursor-pointer font-medium', theme === 'light' ? 'text-primary' : '')}>
								Светлая
							</Label>
						</div>
					</div>

					<div className='flex flex-col'>
						<div
							onClick={() => setTheme('dark')}
							className={cn(
								'relative flex cursor-pointer flex-col items-center rounded-lg border-2 p-2 transition-all',
								theme === 'dark' ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/20'
							)}>
							<div className='absolute right-3 top-3'>
								<Moon className={cn('h-5 w-5', theme === 'dark' ? 'text-primary' : 'text-muted-foreground')} />
							</div>
							<div className='flex h-[180px] w-full flex-col gap-3 overflow-hidden rounded-lg bg-slate-900 p-3'>
								<div className='mb-1 flex items-center gap-2'>
									<div className='flex gap-1'>
										<div className='h-3 w-3 rounded-full bg-[#ff5f57]'></div>
										<div className='h-3 w-3 rounded-full bg-[#febc2e]'></div>
										<div className='h-3 w-3 rounded-full bg-[#28c840]'></div>
									</div>
									<div className='h-2 w-24 rounded-full bg-slate-700'></div>
								</div>

								<div className='flex h-full gap-2'>
									<div className='w-1/4 rounded-md bg-slate-800 p-2'>
										<div className='mb-2 h-3 w-full rounded-md bg-slate-700'></div>
										<div className='mb-2 h-3 w-full rounded-md bg-slate-700'></div>
										<div className='h-3 w-3/4 rounded-md bg-slate-700'></div>
									</div>

									<div className='flex w-3/4 flex-col gap-2'>
										<div className='h-5 w-3/4 rounded-md bg-slate-800'></div>
										<div className='h-20 rounded-md bg-slate-800 p-2 shadow-sm'>
											<div className='mb-2 h-2 w-full rounded-full bg-slate-700'></div>
											<div className='h-2 w-3/4 rounded-full bg-slate-700'></div>
										</div>
										<div className='h-10 rounded-md bg-slate-800 p-2 shadow-sm'>
											<div className='h-2 w-1/2 rounded-full bg-slate-700'></div>
										</div>
									</div>
								</div>
							</div>
							<RadioGroupItem ref={darkThemeRef} hidden value='dark' id='dark' />
							<Label htmlFor='dark' className={cn('mt-3 cursor-pointer font-medium', theme === 'dark' ? 'text-primary' : '')}>
								Темная
							</Label>
						</div>
					</div>

					<div className='flex flex-col'>
						<div
							onClick={() => setTheme('system')}
							className={cn(
								'relative flex cursor-pointer flex-col items-center rounded-lg border-2 p-2 transition-all',
								theme === 'system' ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/20'
							)}>
							<div className='absolute right-3 top-3'>
								<div className={cn('flex items-center', theme === 'system' ? 'text-primary' : 'text-muted-foreground')}>
									<Sun className='h-5 w-5' />
									<span className='mx-0.5'>/</span>
									<Moon className='h-5 w-5' />
								</div>
							</div>
							<div className='flex h-[180px] w-full overflow-hidden rounded-lg'>
								<div className='flex w-1/2 flex-col bg-[#f8f9fa] p-3'>
									<div className='mb-2 h-4 w-full rounded-md bg-[#ecedef]'></div>
									<div className='mb-2 h-12 w-full rounded-md bg-white p-2 shadow-sm'>
										<div className='mb-1 h-2 w-full rounded-full bg-[#ecedef]'></div>
										<div className='h-2 w-2/3 rounded-full bg-[#ecedef]'></div>
									</div>
									<div className='h-8 w-full rounded-md bg-white p-2 shadow-sm'>
										<div className='h-2 w-1/2 rounded-full bg-[#ecedef]'></div>
									</div>
								</div>
								<div className='flex w-1/2 flex-col bg-slate-900 p-3'>
									<div className='mb-2 h-4 w-full rounded-md bg-slate-800'></div>
									<div className='mb-2 h-12 w-full rounded-md bg-slate-800 p-2 shadow-sm'>
										<div className='mb-1 h-2 w-full rounded-full bg-slate-700'></div>
										<div className='h-2 w-2/3 rounded-full bg-slate-700'></div>
									</div>
									<div className='h-8 w-full rounded-md bg-slate-800 p-2 shadow-sm'>
										<div className='h-2 w-1/2 rounded-full bg-slate-700'></div>
									</div>
								</div>
							</div>
							<RadioGroupItem ref={systemThemeRef} hidden value='system' id='system' />
							<Label htmlFor='system' className={cn('mt-3 cursor-pointer font-medium', theme === 'system' ? 'text-primary' : '')}>
								Системная
							</Label>
						</div>
					</div>
				</RadioGroup>

				<div className='mt-6 rounded-lg border border-primary/20 bg-primary/10 p-3'>
					<Typography className='text-sm'>
						Совет: Выбор темы, соответствующей настройкам вашей системы, обеспечивает наиболее комфортный просмотр в любое время
						суток.
					</Typography>
				</div>
			</CardContent>
		</Card>
	)
}
