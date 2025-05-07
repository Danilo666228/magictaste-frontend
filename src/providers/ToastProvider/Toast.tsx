// import { motion } from 'framer-motion'
// import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react'
// import { useState } from 'react'

// import { ToastOptions } from './ToastProvider'

// interface ToastProps {
// 	toast: ToastOptions

// 	position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
// 	onClose?: () => void
// }

// export function Toast({ toast, position = 'bottom-right', onClose }: ToastProps) {
// 	const [isHovered, setIsHovered] = useState(false)

// 	const typeConfig = {
// 		success: {
// 			containerClass: 'bg-gradient-to-r from-green-50 to-green-100 border-green-500 text-green-800',
// 			iconClass: 'text-green-500',
// 			icon: <CheckCircle size={20} />,
// 			progressClass: 'bg-green-500'
// 		},
// 		error: {
// 			containerClass: 'bg-gradient-to-r from-red-50 to-red-100 border-red-500 text-red-800',
// 			iconClass: 'text-red-500',
// 			icon: <AlertCircle size={20} />,
// 			progressClass: 'bg-red-500'
// 		},
// 		warning: {
// 			containerClass: 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-500 text-yellow-800',
// 			iconClass: 'text-amber-500',
// 			icon: <AlertTriangle size={20} />,
// 			progressClass: 'bg-amber-500'
// 		},
// 		info: {
// 			containerClass: 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-500 text-blue-800',
// 			iconClass: 'text-blue-500',
// 			icon: <Info size={20} />,
// 			progressClass: 'bg-blue-500'
// 		}
// 	}

// 	const config = typeConfig[toast.type]
// 	const duration = toast.duration || 3000

// 	const handleClose = () => {
// 		if (onClose) onClose()
// 	}

// 	const getAnimationValues = () => {
// 		switch (position) {
// 			case 'top-right':
// 				return { y: -20, x: 20 }
// 			case 'top-left':
// 				return { y: -20, x: -20 }
// 			case 'bottom-right':
// 				return { y: 20, x: 20 }
// 			case 'bottom-left':
// 				return { y: 20, x: -20 }
// 			default:
// 				return { y: 0, x: 0 }
// 		}
// 	}

// 	const animationValues = getAnimationValues()

// 	return (
// 		<motion.div
// 			initial={{
// 				opacity: 0,
// 				y: animationValues.y,
// 				x: animationValues.x,
// 				scale: 0.95
// 			}}
// 			animate={{
// 				opacity: 1,
// 				y: 0,
// 				x: 0,
// 				scale: 1
// 			}}
// 			exit={{
// 				opacity: 0,
// 				y: animationValues.y,
// 				x: animationValues.x,
// 				scale: 0.95,
// 				transition: { duration: 0.2 }
// 			}}
// 			transition={{ duration: 0.3, type: 'spring', stiffness: 500, damping: 30 }}
// 			onMouseEnter={() => setIsHovered(true)}
// 			onMouseLeave={() => setIsHovered(false)}
// 			className={`group relative flex min-w-[320px] max-w-md items-start overflow-hidden rounded-lg border-l-4 p-4 shadow-lg backdrop-blur-sm ${config.containerClass}`}>
// 			<div className='absolute inset-0 -z-10 bg-white/80 backdrop-blur-sm'></div>

// 			<div className={`mr-3 flex-shrink-0 rounded-full p-1 ${config.iconClass}`}>{config.icon}</div>

// 			<div className='flex-1'>
// 				{toast.title && <h3 className='text-sm font-semibold tracking-tight'>{toast.title}</h3>}
// 				{toast.message && <p className='mt-1 text-xs opacity-90'>{toast.message}</p>}
// 			</div>

// 			<button
// 				onClick={handleClose}
// 				className='flex-shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground'
// 				aria-label='Закрыть уведомление'>
// 				<X size={16} />
// 			</button>

// 			{!isHovered && (
// 				<motion.div
// 					className={`absolute bottom-0 left-0 h-1 ${config.progressClass}`}
// 					initial={{ width: '100%' }}
// 					animate={{ width: '0%' }}
// 					transition={{ duration: duration / 1000, ease: 'linear' }}
// 					onAnimationComplete={handleClose}
// 				/>
// 			)}
// 		</motion.div>
// 	)
// }
