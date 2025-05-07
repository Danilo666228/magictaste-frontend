import { z } from 'zod'

export const ProductCommentSchema = z.object({
	comment: z.string().nonempty({ message: 'Комментарий не может быть пустым' }),
	rating: z.number().min(1, { message: 'Оценка не может быть меньше 1' }).max(5, { message: 'Оценка не может быть больше 5' }).optional()
})

export type ProductCommentSchema = z.infer<typeof ProductCommentSchema>
