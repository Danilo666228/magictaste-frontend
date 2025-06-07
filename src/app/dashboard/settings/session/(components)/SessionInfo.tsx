import { Clock, Info, Loader2, MapPin, MapPinHouse, MonitorSmartphone } from 'lucide-react'
import { useFormatter } from 'next-intl'
import { useState } from 'react'

import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/common'
import { YandexMap } from '@/components/ui/elements/yandex-map/YandexMap'

import { Session } from '@/shared/api/types'

interface SessionInfoProps {
	session: Session | undefined
}

export function SessionInfo({ session }: SessionInfoProps) {
	const formatter = useFormatter()
	const [isLoading, setIsLoading] = useState(false)

	if (isLoading) return <Loader2 className='animate-spin' />

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size={'sm'} variant={'outline'} className='gap-1'>
					<Info size={16} />
					Детали
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-md'>
				<DialogHeader className='pb-2'>
					<DialogTitle className='text-center text-xl'>Информация о сессии</DialogTitle>
				</DialogHeader>

				<div className='space-y-4'>
					<div className='grid grid-cols-1 gap-4'>
						<div className='space-y-1'>
							<p className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
								<MonitorSmartphone className='text-primary' size={16} />
								Устройство
							</p>
							<p className='font-medium'>
								{session?.metadata.device.browser}, {session?.metadata.device.os}
							</p>
						</div>

						<div className='space-y-1'>
							<p className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
								<MapPinHouse className='text-primary' size={16} />
								IP-адрес
							</p>
							<p className='font-medium'>{session?.metadata.ip}</p>
						</div>

						<div className='space-y-1'>
							<p className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
								<MapPin className='text-primary' size={16} />
								Местоположение
							</p>
							<p className='flex items-center gap-1 font-medium'>
								{session?.metadata.location.country}, {session?.metadata.location.city}
							</p>
						</div>

						<div className='space-y-1'>
							<p className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
								<Clock className='text-primary' size={16} />
								Дата создания
							</p>
							<p className='font-medium'>
								{formatter.dateTime(new Date(session?.createdAt as string), {
									dateStyle: 'long',
									timeStyle: 'short'
								})}
							</p>
						</div>
						<div className='overflow-hidden rounded-lg border'>
							<YandexMap
								onLoad={() => setIsLoading(false)}
								initialCoordinates={{
									latitude: session?.metadata.location.latidute ?? 55.76,
									longitude: session?.metadata.location.longitude ?? 37.64
								}}
								defaultZoom={11}
								readonly={true}
							/>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
