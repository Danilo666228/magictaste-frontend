import { AboutMe } from './components/AboutMe'
import { BenefitsSection } from './components/BenefitsSection'
import { CallToOrder } from './components/CallToOrder'
import { HeroCarousel } from './components/HeroCarousel'
import { MostPopularProducts } from './components/MostPopularProducts'

export default function MainPage() {
	return (
		<>
			<section className="relative mx-4 mt-4 h-[400px] overflow-hidden rounded-3xl sm:mx-6 lg:mx-8">
				<HeroCarousel />
				{/*<div className='absolute inset-0 flex items-center bg-gradient-to-r from-black/50 to-transparent pl-8'>*/}
				{/*	<Container className='px-4 sm:px-6 lg:px-8'>*/}
				{/*		<div className='max-w-xl text-white'>*/}
				{/*			<h1 className='mb-4 text-4xl font-bold md:text-5xl lg:text-6xl'>Изысканная кухня для истинных гурманов</h1>*/}
				{/*			<p className='mb-8 text-lg text-white/90 md:text-xl'>*/}
				{/*				Откройте для себя неповторимый вкус наших блюд, приготовленных из свежайших ингредиентов*/}
				{/*			</p>*/}
				{/*			<div className='flex flex-wrap gap-4'>*/}
				{/*				<Button size='lg' variant='default' className='border-muted text-white hover:border hover:bg-transparent'>*/}
				{/*					Посмотреть меню*/}
				{/*				</Button>*/}
				{/*			</div>*/}
				{/*		</div>*/}
				{/*	</Container>*/}
				{/*</div>*/}
			</section>
			<BenefitsSection />
			<MostPopularProducts />
			<AboutMe />
			<CallToOrder />
		</>
	)
}
