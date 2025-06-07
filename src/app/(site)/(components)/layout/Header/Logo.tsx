import { cn } from '@/shared/utils/twMerge'
import { ComponentProps } from 'react'

interface LogoProps extends ComponentProps<'img'> {}

export const Logo = ({ className, width = 100, height = 100, ...props }: LogoProps) => {
	return <img src='/logo.png' width={width} height={height} alt='Logo' className={cn('dark:invert', className)} {...props} />
}
