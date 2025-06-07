'use client'

import { Component, ErrorInfo, ReactNode } from 'react'

import { MODE } from '@/shared/utils/constants'

interface Props {
	children?: ReactNode
}

interface State {
	hasError: boolean
	error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false
	}

	public static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error }
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('ErrorBoundary caught an error:', error, errorInfo)
	}

	public render() {
		if (this.state.hasError) {
			return (
				<div className='flex min-h-screen items-center justify-center'>
					<div className='text-center'>
						<h2 className='mb-4 text-2xl font-bold text-red-600'>Что-то пошло не так</h2>
						<p className='mb-4 text-gray-600'>Произошла ошибка при загрузке приложения</p>
						<button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600' onClick={() => window.location.reload()}>
							Перезагрузить страницу
						</button>
						{MODE === 'development' && (
							<details className='mt-4 text-left'>
								<summary className='cursor-pointer text-sm text-gray-500'>Детали ошибки (только в режиме разработки)</summary>
								<pre className='mt-2 whitespace-pre-wrap text-xs text-red-500'>{this.state.error?.stack}</pre>
							</details>
						)}
					</div>
				</div>
			)
		}

		return this.props.children
	}
}
