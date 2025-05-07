'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/common'

import { cn } from '@/lib/utils/twMerge'

interface ConfirmModalProps {
	open?: boolean
	onOpenChange?: (open: boolean) => void
	title: string
	description?: string
	onConfirm: () => void
	trigger?: React.ReactNode
	children?: React.ReactNode
	icon?: React.ReactNode
	confirmText?: React.ReactNode
	cancelText?: React.ReactNode
	confirmVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
	disabled?: boolean
}

export function ConfirmModal({
	title,
	description,
	onConfirm,
	children,
	open,
	onOpenChange,
	trigger,
	icon,
	confirmText = 'Продолжить',
	cancelText = 'Отмена',
	confirmVariant = 'default',
	disabled = false
}: ConfirmModalProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			{trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
			<AlertDialogContent className='max-w-md rounded-lg border shadow-lg'>
				<AlertDialogHeader className='space-y-3'>
					{icon && <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted/30'>{icon}</div>}
					<AlertDialogTitle className={cn('text-xl font-semibold', icon && 'text-center')}>{title}</AlertDialogTitle>
					{description && (
						<AlertDialogDescription className={cn('text-sm text-muted-foreground', icon && 'text-center')}>
							{description}
						</AlertDialogDescription>
					)}
				</AlertDialogHeader>

				{children && <div className='py-3'>{children}</div>}

				<AlertDialogFooter className='flex gap-3 sm:justify-center'>
					<AlertDialogCancel className='mt-0 flex-1'>{cancelText}</AlertDialogCancel>
					<AlertDialogAction
						onClick={onConfirm}
						className={cn('flex-1', confirmVariant === 'destructive' && 'bg-red-600 text-white hover:bg-red-700')}
						disabled={disabled}>
						{confirmText}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
