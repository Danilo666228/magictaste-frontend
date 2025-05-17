import Link from 'next/link'

import { Button, Typography } from '@/components/ui/common'

import { ROUTE } from '@/config/route.config'

export const CallToOrder = () => {
	return (
		<section className='mx-[3%] rounded-xl bg-muted py-16'>
			<div className='px-4 text-center sm:px-6 lg:px-8'>
				<Typography tag='h2' className='mb-4 text-3xl font-bold'>
					Готовы попробовать наши блюда?
				</Typography>
				<Typography tag='p' className='mx-auto mb-8 max-w-2xl'>
					Закажите доставку и насладитесь изысканными блюдами нашего ресторана
				</Typography>
				<div className='flex flex-col justify-center gap-4 sm:flex-row'>
					<Link href={ROUTE.menu()}>
						<Button size='lg' variant='default' className=''>
							Заказать доставку
						</Button>
					</Link>
				</div>
			</div>
		</section>
	)
}
