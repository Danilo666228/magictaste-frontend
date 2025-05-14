'use client'

import { ProfileAbout } from './ProfileAbout'
import { ProfileLoyalty } from './ProfileLoyalty'
import { ProfileDeliveryAddress } from './delivery-address/ProfileDeliveryAddress'
import { useState } from 'react'

export function Profile() {


	const [open, setIsOpen] = useState<boolean>(false)

	return (
		<div className="flex flex-col gap-10 py-8">
			<div className="mb-4">
				<h1 className="text-3xl font-bold tracking-tight">Мой профиль</h1>
				<p className="mt-1 text-muted-foreground">Управляйте вашей личной информацией и адресами доставки</p>
			</div>

			<div className="grid grid-cols-1 gap-8">
				<div className="md:col-span-3">
					<ProfileAbout />
				</div>
				<div className="md:col-span-3">
					<ProfileDeliveryAddress />
				</div>
				<div className="md:col-span-3">
					<ProfileLoyalty />
				</div>


			</div>
		</div>
	)
}
