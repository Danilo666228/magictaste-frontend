import { AdvantagesSection, ContactInfoSection } from './(components)'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'О нас'
}

export default function AboutPage() {
	return (
		<>
			<AdvantagesSection />
			<ContactInfoSection />
		</>
	)
}
