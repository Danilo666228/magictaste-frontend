'use client'

import { ComponentProps } from 'react'

import { cn } from '@/shared/hooks'

interface ListProps extends ComponentProps<'ul'> {}

interface ListItemProps extends ComponentProps<'li'> {}

const List = ({ children, className, ...props }: ListProps) => {
	return (
		<ul className={cn('', className)} {...props}>
			{children}
		</ul>
	)
}

const ListItem = ({ children, className, ...props }: ListItemProps) => {
	return (
		<li className={cn('', className)} {...props}>
			{children}
		</li>
	)
}

export { List, ListItem }
