import { VariantProps, cva } from 'class-variance-authority'
import { ComponentProps } from 'react'

import { cn } from '@/lib/utils/twMerge'

const typegraphyVariants = cva('', {
	variants: {
		tag: {
			h1: 'text-4xl',
			h2: 'text-3xl',
			h3: 'text-xl',
			h4: 'text-lg',
			p: 'text-base',
			span: 'text-sm'
		}
	}
})

export interface TypegraphyProps extends VariantProps<typeof typegraphyVariants>, ComponentProps<'div'> {
	className?: string
	tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
	children?: React.ReactNode
}

const Typography = ({ ref, tag, className, children, ...props }: TypegraphyProps) => {
	const Tag = tag ? tag : 'span'

	const sizeClass = typegraphyVariants({ tag })

	return (
		<Tag ref={ref} className={cn(sizeClass, className)} {...props}>
			{children}
		</Tag>
	)
}

Typography.displayName = 'Typography'

export { Typography, typegraphyVariants }
