import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Toaster } from '@/components/ui/elements/Toaster'

import { ConfigProvider, FramerMotionProvider, ProfileProvider, TanStackQueryProvider, YandexMapsProvider } from '@/shared/utils/contexts'

interface ProvidersProps {
	children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
	return (
		<ErrorBoundary>
			<ConfigProvider>
				<ThemeProvider attribute={'class'} defaultTheme='system' enableSystem>
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
