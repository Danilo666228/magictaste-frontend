import { z } from 'zod'

export const createProductSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1).optional(),
	weight: z.string().min(1),
	price: z.string().min(1),
	categoryId: z.string().min(1),
	ingredients: z.array(z.string()),
	onSale: z.boolean().optional(),
	
})

export type CreateProductSchema = z.infer<typeof createProductSchema>
