// 'use client'

// import { AnimatePresence } from 'framer-motion'
// import { createContext, useContext, useEffect, useState } from 'react'

// import { useProfile } from '@/hooks/useProfile'

// import { useNotificationsWebSocketStore } from '@/store/useNotificationsWebSocketStore'

// import { Toast } from './Toast'

// type ToastType = 'success' | 'error' | 'warning' | 'info'

// export interface ToastOptions {
// 	id: string
// 	type: ToastType
// 	title: string
// 	message: string
// 	duration?: number
// 	createdAt: number
// }

// interface ToastContextType {
// 	toast: (options: Omit<ToastOptions, 'id' | 'createdAt'>) => void
// }

// interface CustomToastProps {
// 	children: React.ReactNode
// 	maxToasts?: number
// 	position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
// }

// const ToastContext = createContext<ToastContextType | undefined>(undefined)

// export function useToast() {
// 	const context = useContext(ToastContext)
// 	if (!context) {
// 		throw new Error('useToast must be used within a ToastProvider')
// 	}
// 	return context
// }

// export function ToastProvider({ children, maxToasts = 3, position = 'bottom-right' }: CustomToastProps) {
// 	const { profile } = useProfile()
// 	const [toasts, setToasts] = useState<ToastOptions[]>([])
// 	const { initSocket, disconnectSocket, toastMessages, clearToastMessages } = useNotificationsWebSocketStore()

// 	useEffect(() => {
// 		if (profile?.data.id) {
// 			initSocket(profile.data.id)
// 		}

// 		return () => {
// 			disconnectSocket()
// 		}
// 	}, [profile?.data.id, initSocket, disconnectSocket])

// 	useEffect(() => {
// 		if (toastMessages.length > 0) {
// 			toastMessages.forEach(message => {
// 				addToast({
// 					type: message.type,
// 					title: message.title,
// 					message: message.message,
// 					duration: message.duration ?? 3000
// 				})
// 			})

// 			clearToastMessages()
// 		}
// 	}, [toastMessages, clearToastMessages])

// 	const addToast = (options: Omit<ToastOptions, 'id' | 'createdAt'>) => {
// 		const newToast: ToastOptions = {
// 			...options,
// 			id: crypto.randomUUID(),
// 			createdAt: Date.now()
// 		}

// 		setToasts(prev => {
// 			const combined = [...prev, newToast]
// 			return combined.length > maxToasts ? combined.slice(combined.length - maxToasts) : combined
// 		})

// 		setTimeout(() => {
// 			setToasts(prev => prev.filter(t => t.id !== newToast.id))
// 		}, options.duration || 3000)
// 	}

// 	const removeToast = (id: string) => {
// 		setToasts(prev => prev.filter(toast => toast.id !== id))
// 	}

// 	return (
// 		<ToastContext.Provider value={{ toast: addToast }}>
// 			{children}
// 			<div
// 				className={`fixed z-50 m-4 flex gap-4 ${position.includes('top') ? 'top-5' : 'bottom-5'} ${
// 					position.includes('right') ? 'right-5' : 'left-5'
// 				} ${position.includes('top') ? 'flex-col' : 'flex-col-reverse'}`}>
// 				<AnimatePresence>
// 					{toasts.map(toast => (
// 						<Toast key={toast.id} toast={toast} position={position} onClose={() => removeToast(toast.id)} />
// 					))}
// 				</AnimatePresence>
// 			</div>
// 		</ToastContext.Provider>
// 	)
// }
