import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/common'
import React, { ComponentProps, ReactNode } from 'react'
import { ModalContext } from '@/components/ui/elements/modal/Default/ModalContext'

interface ModalProps extends ComponentProps<typeof Dialog> {
	title: string
	description: string
	trigger: ReactNode
	children: ReactNode
	open: boolean
	onOpenChange: (open: boolean) => void
}

export const Modal = ({ title, description, trigger, children, open, onOpenChange, ...props }: ModalProps) => {
	const closeModal = () => onOpenChange(!open)
	return (
		<Dialog {...props} open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader className="relative">
					{title && <DialogTitle className="text-center text-xl font-semibold">{title}</DialogTitle>}
					{description &&
			  <DialogDescription className="text-center text-muted-foreground">{description}</DialogDescription>}
				</DialogHeader>
				<ModalContext.Provider value={{ closeModal }}>{children}</ModalContext.Provider>
			</DialogContent>
		</Dialog>
	)
}