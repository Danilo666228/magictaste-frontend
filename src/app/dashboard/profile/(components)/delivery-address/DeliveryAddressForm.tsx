import { AnimatePresence, motion } from 'framer-motion'
import { Building2, Home, LucideIcon, MapPin, Navigation } from 'lucide-react'
import { useState } from 'react'


import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Label,
	Switch
} from '@/components/ui/common'
import { YandexMap } from '@/components/ui/elements/yandex-map/YandexMap'

import { TypeCreateDeliveryAddressSchema } from '@/schemas/delivery-address/delivery-address'
import { useDeliveryAddressForm } from '@/app/dashboard/profile/(hooks)/useDeliveryAddressForm'

type FieldConfig = {
	name: keyof TypeCreateDeliveryAddressSchema
	label: string
	desc: string
	icon: LucideIcon
	typeInput?: string
}

export function DeliveryAddressForm() {
	const { form, onSubmit, isPending } = useDeliveryAddressForm()
	const [isShowMap, setIsShowMap] = useState(false)

	const formFields: FieldConfig[] = [
		{ name: 'city', label: 'Город', desc: 'Введите ваш город', icon: Building2 },
		{ name: 'street', label: 'Улица', desc: 'Введите вашу улицу', icon: Navigation },
		{ name: 'house', label: 'Дом', desc: 'Введите ваш дом', icon: Home },
		{ name: 'flat', label: 'Квартира', desc: 'Введите вашу квартиру', icon: MapPin, typeInput: 'number' }
	]

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{formFields.map(({ name, label, desc, icon: Icon }) => (
						<FormField
							key={name}
							control={form.control}
							name={name}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">{label}</FormLabel>
									<div className="relative mt-1">
										<FormControl>
											<div className="relative">
												<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
													<Icon className="text-gray-400" size={16} />
												</div>
												<Input
													{...field}
													className="rounded-xl border-gray-200 pl-10 shadow-sm transition-all duration-200 hover:border-gray-300 focus:border-primary"
													placeholder={desc}
													type={field.name === 'flat' ? 'number' : 'text'}
												/>
											</div>
										</FormControl>
										<FormMessage className="mt-1 text-xs" />
									</div>
								</FormItem>
							)}
						/>
					))}
				</div>

				<div className="flex items-center justify-between rounded-lg p-2">
					<div className="flex items-center gap-3">
						<div className="rounded-lg bg-primary/10 p-2">
							<MapPin className="h-5 w-5 text-primary" />
						</div>
						<div>
							<Label htmlFor="address" className="font-medium">
								Выбрать на карте
							</Label>
							<p className="text-sm text-gray-500">Укажите адрес, кликнув по карте</p>
						</div>
					</div>
					<Switch
						id="address"
						checked={isShowMap}
						onCheckedChange={() => setIsShowMap(!isShowMap)}
						className="data-[state=checked]:bg-primary"
					/>
				</div>

				<AnimatePresence mode="wait">
					{isShowMap && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{
								opacity: { duration: 0.2 },
								height: { duration: 0.3 }
							}}
							className="overflow-hidden">
							<div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
								<YandexMap
									onLocationSelect={data => {
										form.setValue('city', data.address?.city ?? '')
										form.setValue('street', data.address?.street ?? '')
										form.setValue('house', data.address?.house ?? '')
									}}
								/>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				<div className="mt-6 flex justify-center">
					<Button
						type="submit"
						disabled={isPending}
						className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 px-8 py-2.5 shadow-lg transition-all">
						{isPending ? 'Сохранение...' : 'Сохранить адрес'}
					</Button>
				</div>
			</form>
		</Form>
	)
}
