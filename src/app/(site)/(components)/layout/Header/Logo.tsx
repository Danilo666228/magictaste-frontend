import { ComponentProps } from 'react'

import { cn } from '@/shared/utils/twMerge'

interface LogoProps extends ComponentProps<'img'> {}

export const Logo = ({ className, width = 100, height = 100, ...props }: LogoProps) => {
	return <img src='/logo.png' width={width} height={height} alt='Logo' className={cn('dark:invert', className)} {...props} />
}
