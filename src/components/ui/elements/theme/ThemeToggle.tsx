'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { ComponentProps, useState, useTransition } from 'react'

import { useMount } from '@/shared/hooks'
import { cn } from '@/shared/hooks/helpers'

import { Button } from '../../common'

interface ThemeToggleProps extends ComponentProps<'div'> {}

export function ThemeToggle({ className }: ThemeToggleProps) {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()
	const [, startTransition] = useTransition()

	useMount(() => {
		setMounted(true)
	})

	if (!mounted) {
		return null
	}

	return (
		<div className={cn('flex items-center gap-2', className)}>
			<Button variant={'outline'} className='size-9' onClick={() => startTransition(() => setTheme(theme === 'dark' ? 'light' : 'dark'))}>
				{theme === 'dark' ? <Moon /> : <Sun />}
			</Button>
		</div>
	)
}
