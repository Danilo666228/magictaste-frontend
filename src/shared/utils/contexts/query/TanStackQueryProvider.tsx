'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode, useState } from 'react'

interface TanStackQueryProviderProps {
	children: ReactNode
}

export function TanStackQueryProvider({ children }: TanStackQueryProviderProps) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					staleTime: 0,
					retry: 2
				}
			}
		})
	)

	return (
		<QueryClientProvider client={client}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
