import { cn } from '@/lib/utils/twMerge'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn('animate-pulse rounded-md bg-gray-300/40', className)} {...props} />
}

export { Skeleton }
