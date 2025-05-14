'use client'

import { MapPin, Plus } from 'lucide-react'
import { useState } from 'react'

import { Button, Card, CardContent, CardHeader, CardTitle, Typography } from '@/components/ui/common'

import { DeliveryAddressForm } from './DeliveryAddressForm'
import { DeliveryAddressItem } from './DeliveryAddressItem'
import { Modal } from '@/components/ui/elements/modal/Default/Modal'
import { useGetDeliveryAddress } from '@/shared/api/hooks/delivery-address/useGetDeliveryAddress'

export function ProfileDeliveryAddress() {
	const { data: deliveryAddresses } = useGetDeliveryAddress()
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<Card className="border shadow-sm">
			<CardHeader className="bg-muted/40 pb-4">
				<div className="flex items-center justify-between">
					<CardTitle className="flex items-center gap-2 text-xl font-semibold">
						<div className="rounded-full bg-primary/10 p-2">
							<MapPin size={24} className="text-primary" />
						</div>
						Адреса доставки
					</CardTitle>
					<Modal title={'Новый адрес'} description={'Добавьте новый адрес доставки'}
								 trigger={<Button className={'hover:text-primary'} variant={'outline'}>
									 <Plus /> Добавить адрес
								 </Button>} open={isOpen}
								 onOpenChange={setIsOpen}>
						<DeliveryAddressForm />
					</Modal>
				</div>
			</CardHeader>
			<CardContent className="mt-5">
				{!deliveryAddresses?.data.length ? (
					<DeliveryAddressEmpty />
				) : (
					<div className="flex flex-col gap-4">
						{deliveryAddresses?.data.map(deliveryAddress => (
							<DeliveryAddressItem key={deliveryAddress.id} deliveryAddress={deliveryAddress} />
						))}
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export function DeliveryAddressEmpty() {
	return (
		<div className="flex flex-col items-center justify-center px-4 py-12 text-center">
			<div className="mb-4 rounded-full bg-primary/10 p-3">
				<MapPin size={32} className="text-primary" />
			</div>
			<Typography tag="h3" className="mb-2 text-xl font-medium">
				У вас нет сохраненных адресов
			</Typography>
			<Typography className="mb-6 max-w-md text-muted-foreground">
				Добавьте адрес доставки, чтобы быстрее оформлять заказы в будущем
			</Typography>
		</div>
	)
}
