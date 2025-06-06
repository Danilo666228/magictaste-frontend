import { ReactNode } from 'react'

import { Toaster } from '@/components/ui/elements/Toaster'

import {
	ConfigProvider,
	FramerMotionProvider,
	NextIntlProvider,
	ProfileProvider,
	TanStackQueryProvider,
	ThemeProvider,
	YandexMapsProvider
} from '@/shared/utils/contexts'

interface ProvidersProps {
	children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
	return (
		<>
			<ConfigProvider>
				<ThemeProvider>
					<FramerMotionProvider>
						<NextIntlProvider>
							<TanStackQueryProvider>
								<ProfileProvider>
									<YandexMapsProvider>{children}</YandexMapsProvider>
								</ProfileProvider>
								<Toaster />
							</TanStackQueryProvider>
						</NextIntlProvider>
					</FramerMotionProvider>
				</ThemeProvider>
			</ConfigProvider>
		</>
	)
}
export default Providers
