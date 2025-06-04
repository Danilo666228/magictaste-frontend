import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ComponentProps, ReactNode } from 'react'

interface NextIntlProviderProps extends ComponentProps<typeof NextIntlClientProvider> {
	children: ReactNode
}

export async function NextIntlProvider({ children, ...props }: NextIntlProviderProps) {
	const messages = await getMessages()

	return (
		<NextIntlClientProvider messages={messages} {...props}>
			{children}
		</NextIntlClientProvider>
	)
}
