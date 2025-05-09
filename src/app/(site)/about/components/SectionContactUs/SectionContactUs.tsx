'use client'

import { Typography } from '@/components/ui/common'
import { YandexMap } from '@/components/ui/elements/yandex-map/YandexMap'

import { contactItems } from './contactItems'

export function SectionContactUs() {
	return (
		<div className='mx-3 mt-7 rounded-xl bg-muted p-5 shadow-inner'>
			<div className='max-w-[calc(w-full - 100px)] mx-auto mb-5 flex flex-col'>
				<Typography className='mb-10 text-center font-semibold' tag='h1'>
					Контакты
				</Typography>
				<div className='grid grid-cols-4 gap-4 max-sm:grid-cols-2'>
					{contactItems.map((item, index) => (
						<div key={index} className='flex flex-col items-center gap-3 max-sm:text-sm'>
							<item.icon className='text-primary' size={32} />
							<Typography className='font-semibold'>{item.title}</Typography>
							{item.content && item.content}
						</div>
					))}
				</div>
			</div>
			<div className='overflow-hidden rounded-xl border'>
				<YandexMap readonly initialCoordinates={{ latitude: 59.955687, longitude: 30.307577 }} />
			</div>
		</div>
	)
}
