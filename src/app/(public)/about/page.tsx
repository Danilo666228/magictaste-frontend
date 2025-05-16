import { Metadata } from 'next'
import { SectionContactUs } from './components/SectionContactUs/SectionContactUs'
import { SectionWhyMe } from './components/SectionWhyMe/SectionWhyMe'

export const metadata : Metadata = {
	title: 'О нас',
}

export default function AboutPage() {
	return (
		<div>
			<SectionWhyMe />
			<SectionContactUs />
		</div>
	)
}
