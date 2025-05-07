import { z } from 'zod'

export const checkoutSchema = z
	.object({
		lastName: z.string({ message: 'Фамилия должна быть строкой' }).nonempty({ message: 'Фамилия должна быть заполнена' }),
		firstName: z.string({ message: 'Имя должно быть строкой' }).nonempty({ message: 'Имя должно быть заполнено' }),
		email: z
			.string({ message: 'Email должен быть строкой' })
			.optional()
			.refine(email => !email || z.string().email().safeParse(email).success, { message: 'Email должен быть валидным' }),
		phone: z.string({ message: 'Телефон должен быть строкой' }).nonempty({ message: 'Телефон должен быть заполнен' }),
		deliveryAddressId: z.string({ message: 'Адрес доставки должен быть строкой' }).optional(),
		deliveryAddress: z
			.object({
				city: z.string({ message: 'Обязательное поле' }).optional(),
				street: z.string({ message: 'Обязательное поле' }).optional(),
				house: z.string({ message: 'Обязательное поле' }).optional(),
				flat: z.string({ message: 'Обязательное поле' }).optional()
			})
			.optional(),
		paymentMethod: z.enum(['CARD', 'CASH'], { message: 'Необходимо выбрать способ оплаты' }),
		comment: z.string({ message: 'Комментарий должен быть строкой' }).optional(),
		deliveryType: z.enum(['COURIER', 'PICKUP'], { message: 'Необходимо выбрать тип доставки' })
	})
	.superRefine((data, ctx) => {
		// Если выбран самовывоз, то адрес доставки не нужен
		if (data.deliveryType === 'PICKUP') {
			return
		}

		// Если выбрана доставка курьером, то нужен либо deliveryAddressId, либо deliveryAddress
		if (data.deliveryType === 'COURIER' && !data.deliveryAddressId && !data.deliveryAddress) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Необходимо указать адрес доставки',
				path: ['deliveryAddress']
			})
		}

		// Если выбрана доставка курьером и указан deliveryAddress, проверяем его поля
		if (data.deliveryType === 'COURIER' && !data.deliveryAddressId && data.deliveryAddress) {
			if (!data.deliveryAddress.city) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Обязательное поле',
					path: ['deliveryAddress.city']
				})
			}
			if (!data.deliveryAddress.street) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Обязательное поле',
					path: ['deliveryAddress.street']
				})
			}
			if (!data.deliveryAddress.house) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Обязательное поле',
					path: ['deliveryAddress.house']
				})
			}
			if (!data.deliveryAddress.flat) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Обязательное поле',
					path: ['deliveryAddress.flat']
				})
			}
		}
	})

export type TypeCheckoutSchema = z.infer<typeof checkoutSchema>
