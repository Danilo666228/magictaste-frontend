import { AboutMe, BenefitsSection, CallToOrder, HeroCarousel, MostPopularProducts } from './(components)/sections'
import { Metadata } from 'next'

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
