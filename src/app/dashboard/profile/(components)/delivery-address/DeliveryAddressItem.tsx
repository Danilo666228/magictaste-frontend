import { Building2, Home, MapPin, Trash2 } from 'lucide-react'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Button,
	Separator,
	Typography
} from '@/components/ui/common'
import { DeliveryAddress } from '@/shared/api/types'
import { useDeleteDeliveryAddressMutation } from '@/shared/api/hooks/delivery-address/useDeleteDeliveryAddressMutation'
import { useQueryClient } from '@tanstack/react-query'

interface DeliveryAddressItemProps {
	deliveryAddress: DeliveryAddress
}

export function DeliveryAddressItem({ deliveryAddress }: DeliveryAddressItemProps) {
	const queryClient = useQueryClient()
	const { mutate: deleteDeliveryAddress } = useDeleteDeliveryAddressMutation({
		options: {
			onSuccess() {
				queryClient.invalidateQueries({ queryKey: ['getDeliveryAddresses'] })
			}
		}
	})
	const handleDelete = () => deleteDeliveryAddress({ config: { params: { addressId: deliveryAddress.id } } })
	return (
		<Accordion type="multiple" className="overflow-hidden rounded-lg border">
			<AccordionItem value={deliveryAddress.id} className="border-0">
				<AccordionTrigger className="px-5 py-4 transition-colors">
					<div className="flex w-full items-center justify-between gap-x-4">
						<div className="rounded-full bg-primary/10 p-2">
							<MapPin size={18} className="text-primary" />
						</div>
						<div className="mr-auto space-y-1 text-left">
							<div className="flex items-center gap-2">
								<Typography tag="h3" className="font-semibold tracking-wide">
									{deliveryAddress.city}
								</Typography>
							</div>
							<div className="text-sm text-muted-foreground">
								{deliveryAddress.street}, д. {deliveryAddress.house}
							</div>
						</div>
					</div>
				</AccordionTrigger>

				<AccordionContent className="bg-muted/5">
					<div className="space-y-4 p-5">
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div className="flex items-center gap-2 rounded-md bg-muted/10 p-3">
								<Building2 size={18} className="text-muted-foreground" />
								<div>
									<p className="text-xs text-muted-foreground">Город</p>
									<p className="font-medium">{deliveryAddress.city}</p>
								</div>
							</div>

							<div className="flex items-center gap-2 rounded-md bg-muted/10 p-3">
								<MapPin size={18} className="text-muted-foreground" />
								<div>
									<p className="text-xs text-muted-foreground">Улица</p>
									<p className="font-medium">{deliveryAddress.street}</p>
								</div>
							</div>

							<div className="flex items-center gap-2 rounded-md bg-muted/10 p-3">
								<Home size={18} className="text-muted-foreground" />
								<div>
									<p className="text-xs text-muted-foreground">Дом</p>
									<p className="font-medium">{deliveryAddress.house}</p>
								</div>
							</div>

							{deliveryAddress.flat && (
								<div className="flex items-center gap-2 rounded-md bg-muted/10 p-3">
									<Home size={18} className="text-muted-foreground" />
									<div>
										<p className="text-xs text-muted-foreground">Квартира</p>
										<p className="font-medium">{deliveryAddress.flat}</p>
									</div>
								</div>
							)}
						</div>

						<Separator className="my-2" />

						<div className="flex justify-end gap-2">
							<Button onClick={() => handleDelete()} variant="destructive" size="sm"
											className="gap-1">
								<Trash2 size={14} />
								Удалить
							</Button>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
