import { Metadata } from 'next'

import { AdvantagesSection, ContactInfoSection } from './(components)'

export const metadata: Metadata = {
	title: 'О нас'
}

export default function AboutPage() {
	return (
		<div>
			<AdvantagesSection />
			<ContactInfoSection />
		</div>
	)
}
