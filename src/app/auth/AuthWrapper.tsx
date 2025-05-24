'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode } from 'react'

interface AuthWrapperProps {
	title: string
	description?: string
	backLabel?: string
	backLabelHref?: string
	backHref?: string
	children: ReactNode
}

export function AuthWrapper({ title, description, backLabel, backLabelHref, backHref, children }: AuthWrapperProps) {
	return (
		<AnimatePresence mode={'popLayout'}>
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='flex flex-col gap-6'>
				<div className='space-y-2 text-center'>
					<h1 className='text-3xl font-bold tracking-tight'>{title}</h1>
					<p className='text-muted-foreground'>{description}</p>
				</div>

				<div className='flex flex-col gap-6'>{children}</div>

				<div className='flex items-center justify-center gap-1 text-center text-sm'>
					<span className='text-muted-foreground'>{backLabel}</span>
					{backHref && (
						<Link href={backHref} className='font-medium text-primary underline-offset-4 hover:underline'>
							{backLabelHref}
						</Link>
					)}
				</div>
			</motion.div>
		</AnimatePresence>
	)
}
