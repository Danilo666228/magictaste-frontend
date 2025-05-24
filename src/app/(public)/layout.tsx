import { ReactNode } from 'react'

import { Footer } from '@/components/layout/footer/Footer'
import { Header } from '@/components/layout/header/Header'
import { SupportChat } from '@/components/ui/elements/support-chat/SupportChat'

interface SiteLayoutProps {
	children: ReactNode
	modal: ReactNode
}

export default function SiteLayout({ children, modal }: SiteLayoutProps) {
	return (
		<>
			<Header />
			<main className='mx-[70px]'>{children}</main>
			<SupportChat />
			<Footer />
			{modal}
		</>
	)
}
