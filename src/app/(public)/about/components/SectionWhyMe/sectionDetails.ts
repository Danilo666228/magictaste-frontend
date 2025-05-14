interface SectionDetailsWhyMe {
	id: number
	img: string
	title: string
	description: string
}

export const sectionDetails: SectionDetailsWhyMe[] = [
	{
		id: 1,
		img: '/aboutSectionDetails/photo1.webp',
		title: 'Стерильность производства',
		description: 'Все работы производятся исключительно в одноразовых перчатках. Мы заботимся о здоровье наших клиентов.'
	},
	{
		id: 2,
		img: '/aboutSectionDetails/photo2.webp',
		title: 'Идеальные пропорции',
		description: 'Наши повара строго следуют оригинальной рецептуре, гарантирующей идеальное соотношение теста и начинки.'
	},
	{
		id: 3,
		img: '/aboutSectionDetails/photo3.webp',
		title: 'Наши повара строго следуют оригинальной рецептуре, гарантирующей идеальное соотношение теста и начинки.',
		description:
			'Мы соблюдаем условия хранения продукции, что гарантирует сохранение вкусовых качеств и неизменно идеальный внешний вид.'
	},
	{
		id: 4,
		img: '/aboutSectionDetails/photo4.webp',
		title: 'Только натуральные продукты',
		description:
			'Мы используем только натуральные ингредиенты для наших изделий. Даже окраска пельменей производится с помощью натуральных соков.'
	}
]
