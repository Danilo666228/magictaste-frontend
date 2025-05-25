import { z } from 'zod'

export const loyaltySchema = z.object({
	title: z.string({ message: 'Название должно быть строкой' }).nonempty({ message: 'Название должно быть заполнен' }),
	minPoints: z.number().min(1, { message: 'Минимальное количество баллов не может быть меньше 1' }),
	proccent: z.number().min(1, { message: 'Процент не может быть меньше 1' }).max(100, { message: 'Процент не может быть больше 100' })
})

export type LoyaltySchema = z.infer<typeof loyaltySchema>
