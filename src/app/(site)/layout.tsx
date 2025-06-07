import { Footer, Header } from './(components)/layout'
import { ReactNode } from 'react'

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
