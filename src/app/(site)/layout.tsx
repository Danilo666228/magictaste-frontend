import { ReactNode } from 'react'

import { SupportChat } from '@/components/shared'

import { Footer, Header } from './(components)/layout'

interface SiteLayoutProps {
	children: ReactNode
	modal: ReactNode
}

export default function SiteLayout({ children, modal }: SiteLayoutProps) {
	return (
		<>
			<Header />
			<main className='mx-[70px]'>{children}</main>
			{modal}
			<SupportChat />
			<Footer />
		</>
	)
}
