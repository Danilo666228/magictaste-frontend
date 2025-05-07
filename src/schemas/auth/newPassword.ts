import { z } from 'zod'

export const newPasswordSchema = z.object({
	email: z.string().email()
})

export type NewPasswordSchema = z.infer<typeof newPasswordSchema>
