import { z } from 'zod'

export const createCategorySchema = z.object({
	title: z.string().min(1, { message: 'Название категории обязательно' })
})

export type CreateCategorySchema = z.infer<typeof createCategorySchema>
