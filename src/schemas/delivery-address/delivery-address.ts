import { z } from 'zod'

export const deliveryAddressSchema = z.object({
	city : z.string({ message: 'Город должен быть строкой' }).nonempty({ message: 'Город должен быть заполнен' }),
	street : z.string({ message: 'Улица должна быть строкой' }).nonempty({ message: 'Улица должна быть заполнена' }),
	house : z.string({ message: 'Дом должен быть строкой' }).nonempty({ message: 'Дом должен быть заполнен' }),
	flat : z.string({ message: 'Квартира должна быть строкой' }).nonempty({ message: 'Квартира должна быть заполнена' }),
	// longitude : z.number().optional(),
	// latitude : z.number().optional()
})

export type TypeCreateDeliveryAddressSchema = z.infer<typeof deliveryAddressSchema>