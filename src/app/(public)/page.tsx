import { Metadata } from 'next'
import { AboutMe } from './components/AboutMe'
import { BenefitsSection } from './components/BenefitsSection'
import { CallToOrder } from './components/CallToOrder'
import { HeroCarousel } from './components/HeroCarousel'
import { MostPopularProducts } from './components/MostPopularProducts'

export const metadata : Metadata = {
	title: 'Главная',
	description : ''
}

export default function MainPage() {
	return (
		<>
			<section className='relative mx-4 mt-4 h-[400px] overflow-hidden rounded-3xl sm:mx-6 lg:mx-8'>
				<HeroCarousel />
			</section>
			<BenefitsSection />
			<MostPopularProducts />
			<AboutMe />
			<CallToOrder />
		</>
	)
}
