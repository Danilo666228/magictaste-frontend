'use client'

import { FallbackProps, useErrorBoundary } from 'react-error-boundary'

export const ErrorFallback = ({ error }: FallbackProps) => {
	const { resetBoundary } = useErrorBoundary()
	return (
		<div className='error-boundary-fallback-wrapper'>
			<h1>Something went wrong</h1>
			<p>{error.message}</p>
			<button onClick={resetBoundary}>Home</button>
		</div>
	)
}
