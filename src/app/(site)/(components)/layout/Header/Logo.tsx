import Image from 'next/image'
import { ComponentProps } from 'react'

import { cn } from '@/shared/utils/twMerge'

type LogoProps = ComponentProps<typeof Image>

export const Logo = ({ className, src, width = 100, height = 100, alt = 'Logo', ...props }: LogoProps) => {
	return <Image src={src} width={width} height={height} alt={alt} className={cn('dark:invert', className)} {...props} />
}
