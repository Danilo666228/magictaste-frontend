'use client'

import { NextIntlClientProvider } from 'next-intl'
import { ComponentProps, ReactNode } from 'react'

interface NextIntlProviderProps extends ComponentProps<typeof NextIntlClientProvider> {
	children: ReactNode
	messages?: any
}

export function NextIntlProvider({ children, messages, ...props }: NextIntlProviderProps) {
	return (
		<NextIntlClientProvider messages={messages} {...props}>
			{children}
		</NextIntlClientProvider>
	)
}
