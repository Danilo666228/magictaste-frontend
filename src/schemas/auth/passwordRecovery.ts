import { z } from 'zod'

export const passwordRecoverySchema = z.object({
	password: z.string().min(6).max(32),
	passwordRepeat: z.string().min(6).max(32)
})

export type PasswordRecoverySchema = z.infer<typeof passwordRecoverySchema>
