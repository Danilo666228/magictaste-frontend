import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

import { ErrorBoundary } from '@/components/shared/error-boundary/ErrorBoundary'

import { ConfigProvider, FramerMotionProvider, ProfileProvider, TanStackQueryProvider, Toaster, YandexMapsProvider } from '@/shared/utils/contexts'

interface ProvidersProps {
	children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
	return (
		<ErrorBoundary>
			<ConfigProvider>
				<ThemeProvider attribute={'class'} defaultTheme='system' enableSystem disableTransitionOnChange>
					<FramerMotionProvider>
						<TanStackQueryProvider>
							<ProfileProvider>
								<YandexMapsProvider>
									{children}
									<Toaster />
								</YandexMapsProvider>
							</ProfileProvider>
						</TanStackQueryProvider>
					</FramerMotionProvider>
				</ThemeProvider>
			</ConfigProvider>
		</ErrorBoundary>
	)
}

export default Providers
