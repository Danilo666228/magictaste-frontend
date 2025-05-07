'use client'

import { AnimatePresence, motion } from 'framer-motion'
import React, { ComponentProps, useCallback } from 'react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/common'

import { ModalContext } from './FormModalContext'

interface FormModalProps extends ComponentProps<'div'> {
	isOpen?: boolean
	onOpenChange?: (isOpen: boolean) => void
	title: string
	description?: string
	renderForm: () => React.ReactNode
	trigger?: React.ReactNode
}

export function FormModal({ trigger, renderForm, title, description, isOpen, onOpenChange, ...props }: FormModalProps) {
	const closeModal = useCallback(() => {
		onOpenChange?.(false)
	}, [onOpenChange])

	return (
		<Dialog modal open={isOpen} onOpenChange={onOpenChange} {...props}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<AnimatePresence mode='wait'>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader className='relative'>
						{title && <DialogTitle className='text-center text-xl font-semibold'>{title}</DialogTitle>}
						{description && <DialogDescription className='text-center text-muted-foreground'>{description}</DialogDescription>}
					</DialogHeader>
					<motion.div
						key='modal-content'
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.5, type: 'spring', stiffness: 500 }}>
						<ModalContext.Provider value={{ closeModal }}>{renderForm()}</ModalContext.Provider>
					</motion.div>
				</DialogContent>
			</AnimatePresence>
		</Dialog>
	)
}
