import { ReactNode } from 'react'

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
			<Footer />
		</>
	)
}
