import { Metadata } from 'next'

import { AboutMe } from './components/AboutMe'
import { BenefitsSection } from './components/BenefitsSection'
import { CallToOrder } from './components/CallToOrder'
import { HeroCarousel } from './components/HeroCarousel'
import { MostPopularProducts } from './components/MostPopularProducts'

export const metadata: Metadata = {
	title: 'Главная',
	description: ''
}

export default function MainPage() {
	return (
		<>
			<HeroCarousel />
			<BenefitsSection />
			<MostPopularProducts />
			<AboutMe />
			<CallToOrder />
		</>
	)
}
