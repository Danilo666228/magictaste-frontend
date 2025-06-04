import { ReactNode } from 'react'

import { Toaster } from '@/components/ui/elements/Toaster'

import {
	ConfigProvider,
	FramerMotionProvider,
	NextIntlProvider,
	TanStackQueryProvider,
	ThemeProvider,
	YandexMapsProvider
} from '@/shared/utils/contexts'

interface ProvidersProps {
	children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
	return (
		<>
			<ConfigProvider />
			<ThemeProvider>
				<FramerMotionProvider>
					<NextIntlProvider>
						<TanStackQueryProvider>
							<YandexMapsProvider>{children}</YandexMapsProvider>
							<Toaster />
						</TanStackQueryProvider>
					</NextIntlProvider>
				</FramerMotionProvider>
			</ThemeProvider>
		</>
	)
}
