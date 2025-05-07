import Image from 'next/image'
import Link from 'next/link'
import { ComponentProps } from 'react'

import { Typography } from '@/components/ui/common'

import { ROUTE } from '@/config/route.config'
import { cn } from '@/lib/utils'

interface LogoProps extends ComponentProps<'div'> {}

export function Logo({ className }: LogoProps) {
	return (
		<Link href={ROUTE.home} className={cn('flex items-center gap-2', className)}>
			<div className='relative'>
				<Image src='/logo.png' alt='Logo' width={80} height={80} className='dark:invert' />
			</div>
			<div className='flex flex-col gap-2 max-lg:hidden'>
				<Typography tag='h4'>MagicTaste</Typography>
				<Typography tag='span' className='text-muted-foreground'>
					Доставка еды
				</Typography>
			</div>
		</Link>
	)
}
