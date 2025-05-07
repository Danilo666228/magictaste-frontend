import { VariantProps, cva } from 'class-variance-authority'
import { ComponentProps } from 'react'

import { Container, Typography } from '@/components/ui/common'

import { cn } from '@/lib/utils/twMerge'

const headingSizes = cva('', {
	variants: {
		size: {
			sm: 'text-lg',
			default: 'text-2xl',
			lg: 'text-4xl',
			xl: 'text-5xl'
		}
	},
	defaultVariants: {
		size: 'default'
	}
})

interface HeadingProps extends VariantProps<typeof headingSizes>, ComponentProps<'div'> {
	title: string
	description?: string
}

const Heading = ({ title, description, className, size, ...props }: HeadingProps) => {
	return (
		<Container className={cn('mb-4', className)} {...props}>
			<h1 className={cn('font-semibold text-foreground my-2', headingSizes({ size }))}>{title}</h1>
			{description && <Typography className='text-muted-foreground'>{description}</Typography>}
		</Container>
	)
}

export { Heading }
