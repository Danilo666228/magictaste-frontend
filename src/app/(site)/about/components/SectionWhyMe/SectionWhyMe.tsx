import Image from 'next/image'

import { Typography } from '@/components/ui/common'

import { sectionDetails } from './sectionDetails'

export function SectionWhyMe() {
	return (
		<section className='container mx-auto mt-5'>
			<div className='mb-5 flex justify-center'>
				<Typography className='font-semibold' tag='h1'>
					Почему выбирают нас
				</Typography>
			</div>
			<div className='mx-auto grid w-fit grid-cols-2 gap-10 max-xl:grid-cols-1'>
				{sectionDetails.map(section => (
					<div
						key={section.id}
						className='group flex max-w-[560px] flex-col gap-3 rounded-xl border p-3 transition-transform duration-300 hover:-translate-y-1'>
						<div className='relative h-[340px] overflow-hidden rounded-xl'>
							<Image alt={section.title} src={section.img} className='object-cover' fill />
						</div>
						<Typography className='font-semibold group-hover:text-primary'>{section.title}</Typography>
						<Typography>{section.description}</Typography>
					</div>
				))}
			</div>
		</section>
	)
}
