import { VariantProps, cva } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/common'

import { cn } from '@/lib/utils/twMerge'

const containerVariants = cva('', {
	variants: {}
})

interface ContainerProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {
	tooltip?: string
}

function Container({ className, children, tooltip, ...props }: ContainerProps) {
	return (
		<div className={cn(containerVariants({ className }))} {...props}>
			{tooltip ? (
				<Tooltip>
					<TooltipTrigger asChild>{children}</TooltipTrigger>
					<TooltipContent>{tooltip}</TooltipContent>
				</Tooltip>
			) : (
				children
			)}
		</div>
	)
}

export { Container, containerVariants }
