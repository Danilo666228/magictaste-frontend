import { Star } from 'lucide-react'
import { forwardRef } from 'react'

import { cn } from '@/lib/utils/twMerge'

interface RatingProps {
	value: number
	onChange?: (value: number) => void
	readOnly?: boolean
	className?: string
}

export const Rating = forwardRef<HTMLDivElement, RatingProps>(({ value = 0, onChange, readOnly = false, className, ...props }, ref) => {
	const handleStarClick = (star: number) => {
		if (!readOnly && onChange) {
			onChange(star)
		}
	}

	return (
		<div ref={ref} className={cn('flex items-center gap-1', className)} {...props}>
			{[1, 2, 3, 4, 5].map(star => (
				<button
					type='button'
					key={star}
					onClick={() => handleStarClick(star)}
					className={cn(
						'outline-none transition-all duration-200 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
						readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110 active:scale-90',
						star <= value && 'animate-[pulse_0.2s_ease-in-out]'
					)}
					style={{ WebkitTapHighlightColor: 'transparent' }}
					disabled={readOnly}
					aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}>
					<Star
						className={cn(
							'h-5 w-5 transition-all duration-200',
							star <= value
								? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_2px_rgba(250,204,21,0.4)]'
								: 'fill-none text-gray-300 hover:text-gray-400'
						)}
					/>
				</button>
			))}
		</div>
	)
})

Rating.displayName = 'Rating'
