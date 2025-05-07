import { z } from 'zod'

export const changePasswordSchema = z.object({
	oldPassword: z.string().min(6, { message: 'Старый пароль должен быть не менее 6 символов' }),
	newPassword: z.string().min(6, { message: 'Новый пароль должен быть не менее 6 символов' }),
})
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>
