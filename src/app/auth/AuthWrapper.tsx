'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode } from 'react'

import { Container } from '@/components/ui/common'

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
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			className='flex flex-col gap-6'>
			<Container className='space-y-2 text-center'>
				<h1 className='text-3xl font-bold tracking-tight'>{title}</h1>
				<p className='text-muted-foreground'>{description}</p>
			</Container>

			<div className='flex flex-col gap-6'>{children}</div>

			<Container className='text-center text-sm'>
				<span className='text-muted-foreground'>{backLabel}</span>{' '}
				{backHref && (
					<Link href={backHref} className='font-medium text-primary underline-offset-4 hover:underline'>
						{backLabelHref}
					</Link>
				)}
			</Container>
		</motion.div>
	)
}
