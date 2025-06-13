import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { ComponentProps } from 'react'

import { Button } from '@/components/ui/common'

type ThemeButtonProps = ComponentProps<typeof Button>

export const ThemeToggle = (props: ThemeButtonProps) => {
	const { setTheme, theme } = useTheme()

	const onThemeClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
		const x = event.clientX
		const y = event.clientY
		const radius = Math.hypot(window.innerWidth, window.innerHeight)

		if (document.startViewTransition) {
			await document.startViewTransition(() => {
				setTheme(theme === 'dark' ? 'light' : 'dark')
			}).ready

			document.documentElement.animate(
				{
					clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`]
				},
				{
					duration: 800,
					easing: 'ease-in-out',
					pseudoElement: '::view-transition-new(root)'
				}
			)
		} else {
			setTheme(theme === 'dark' ? 'light' : 'dark')
		}
	}

	return (
		<Button size='icon' variant='ghost' onClick={onThemeClick} className='transition-all duration-200 hover:bg-primary/5' {...props}>
			{theme === 'dark' ? (
				<SunIcon className='h-4 w-4 transition-transform duration-300 hover:rotate-12' />
			) : (
				<MoonIcon className='h-4 w-4 transition-transform duration-300 hover:-rotate-12' />
			)}
		</Button>
	)
}
