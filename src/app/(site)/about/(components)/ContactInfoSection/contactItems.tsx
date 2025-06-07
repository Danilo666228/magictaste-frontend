import { Clock, Instagram, LucideIcon, Map, PhoneOutgoing } from 'lucide-react'
import Link from 'next/link'

import { Typography } from '@/components/ui/common'

interface ContactItem {
	icon: LucideIcon
	title: string
	content?: React.ReactNode
}

export const contactItems: ContactItem[] = [
	{
		icon: PhoneOutgoing,
		title: 'Контакты',
		content: (
			<div className='flex flex-col gap-1'>
				<Typography>+7 (812) 498-09-77</Typography>
				<Typography>+7 (921) 961-90-07</Typography>
			</div>
		)
	},
	{
		icon: Map,
		title: 'Адрес',
		content: <div className='text-center'>Санкт-Петербург ул.Маркина, д.4</div>
	},
	{
		icon: Clock,
		title: 'Время работы',
		content: (
			<div className='text-center'>
				с 9.00 до 23.00 по будням <br /> с 10.00 до 23.00 по выходным
			</div>
		)
	},
	{
		icon: Instagram,
		title: 'Мы в соцсетях',
		content: (
			<Link className='underline' href={'#'}>
				Мы в Инстаграмм
			</Link>
		)
	}
]
