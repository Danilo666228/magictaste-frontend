import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

import { Toaster } from '@/components/ui/elements/Toaster'

import { ConfigProvider, FramerMotionProvider, ProfileProvider, TanStackQueryProvider, YandexMapsProvider } from '@/shared/utils/contexts'

interface ProvidersProps {
	children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
	return (
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
	)
}

export default Providers
