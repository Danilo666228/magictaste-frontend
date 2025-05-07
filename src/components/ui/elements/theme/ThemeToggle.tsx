'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { ComponentProps, useState } from 'react'

import { useMount } from '@/shared/hooks'

import { Button } from '../../common'

import { cn } from '@/lib/utils'

interface ThemeToggleProps extends ComponentProps<'div'> {}

export function ThemeToggle({ className }: ThemeToggleProps) {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	useMount(() => {
		setMounted(true)
	})

	if (!mounted) {
		return null
	}

	return (
		<div className={cn('flex items-center gap-2', className)}>
			<Button variant={'outline'} className='size-8' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
				{theme === 'dark' ? <Moon /> : <Sun />}
			</Button>
		</div>
	)
}
