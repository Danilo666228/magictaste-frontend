import { z } from 'zod'

export const newPasswordSchema = z.object({
	email: z.string({ message: 'Почта должна быть строкой' }).email({ message: 'Некорректная почта' })
})

export type NewPasswordSchema = z.infer<typeof newPasswordSchema>
