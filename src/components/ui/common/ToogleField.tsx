import type { LucideIcon } from 'lucide-react'
import type { IconType } from 'react-icons'

import { Container, Skeleton, Switch, Typography } from '@/components/ui/common'

interface ToogleFieldProps {
	title: string
	description?: string
	Icon?: LucideIcon | IconType
	value: boolean
	onChange?: (value: boolean) => void
	isDisabled?: boolean
	onClick?: () => void
}

export function ToogleField({ title, description, value, isDisabled, onChange, Icon, onClick }: ToogleFieldProps) {
	return (
		<Container className='flex items-center gap-3'>
			{Icon && <Icon size={20} className='mt-1 self-start' />}
			<Container className='flex max-w-xs flex-col'>
				<Container className='flex flex-col gap-1'>
					<Typography className='font-semibold'>{title}</Typography>
					{description && <Typography className='text-sm text-muted-foreground'>{description}</Typography>}
				</Container>
			</Container>
			<Switch onClick={onClick} className='ml-auto' disabled={isDisabled} checked={value} onCheckedChange={onChange} />
		</Container>
	)
}
export function ToogleFieldSkeleton() {
	return <Skeleton className='mt-6 h-20 w-full' />
}
