import { Typography } from '@/components/ui/common'
import { cn } from '@/shared/utils/twMerge'
import { VariantProps, cva } from 'class-variance-authority'
import { ComponentProps } from 'react'

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
		<div className={cn('mb-4', className)} {...props}>
			<h1 className={cn('my-2 font-semibold text-foreground', headingSizes({ size }))}>{title}</h1>
			{description && <Typography className='text-muted-foreground'>{description}</Typography>}
		</div>
	)
}

export { Heading }
