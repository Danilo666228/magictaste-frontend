'use client'

import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { Toaster as Sonner, toast } from 'sonner'

import { useConfig } from '@/hooks/useConfig'
import { useProfile } from '@/hooks/useProfile'

import { fonts } from '@/lib/constants/font.constants'
import { cn } from '@/lib/utils'

import { useNotificationsWebSocketStore } from '@/store/useNotificationsWebSocketStore'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
	const { fontFamily, accentRadius, accentColor } = useConfig()
	const { theme = 'system' } = useTheme()
	const { profile } = useProfile()
	const { initSocket, disconnectSocket, toastMessages, clearToastMessages } = useNotificationsWebSocketStore()

	useEffect(() => {
		if (profile?.data.id) {
			initSocket(profile.data.id)
		}

		return () => {
			disconnectSocket()
		}
	}, [profile?.data.id, initSocket, disconnectSocket])

	useEffect(() => {
		if (toastMessages.length > 0) {
			toastMessages.forEach(message => {
				toast[message.type](message.title, {
					description: message.message
				})
			})

			clearToastMessages()
		}
	}, [toastMessages, clearToastMessages])

	return (
		<Sonner
			position='bottom-right'
			swipeDirections={['right', 'left']}
			richColors
			closeButton
			duration={3000}
			theme={theme as ToasterProps['theme']}
			className={cn('toaster group', fonts[fontFamily as keyof typeof fonts].className)}
			toastOptions={{
				style: {
					gap: '15px',
					wordBreak: 'break-word',
					wordWrap: 'break-word',
					overflowWrap: 'break-word',
					whiteSpace: 'break-spaces',
					accentColor: 'var(--accent-color)',
					borderRadius: accentRadius
				},
				classNames: {
					toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-xl rounded-lg p-4',
					title: 'group-[.toast]:font-semibold group-[.toast]:text-lg',
					icon: 'group-[.toast]:text-primary',
					description: 'group-[.toast]:text-muted-foreground group-[.toast]:text-sm font-normal',
					actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground rounded-md px-3 py-1',
					cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground rounded-md px-3 py-1'
				}
			}}
			{...props}
		/>
	)
}

export { Toaster }
