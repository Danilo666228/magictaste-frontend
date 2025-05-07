import { z } from 'zod'

export const signInSchema = z.object({
	email: z.string({ message: 'Почта должна быть строкой' }).email({ message: 'Некорректная почта' }).nonempty(),
	password: z.string({ message: 'Пароль должен быть строкой' }).min(6, { message: 'Не менее 6 символов' }).nonempty(),
	totpCode: z.string().optional(),
	emailCode: z.string().optional()
})

export type SignInSchema = z.infer<typeof signInSchema>
