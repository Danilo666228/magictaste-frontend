import { Metadata } from 'next'

import { AboutMe, BenefitsSection, CallToOrder, HeroCarousel, MostPopularProducts } from './(components)/sections'

export const metadata: Metadata = {
	title: 'Главная'
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
