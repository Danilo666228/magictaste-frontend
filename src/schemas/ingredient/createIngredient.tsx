import { z } from 'zod'

export const createIngredientSchema = z.object({
	title: z.string().min(1)
})

export type CreateIngredientSchema = z.infer<typeof createIngredientSchema>
