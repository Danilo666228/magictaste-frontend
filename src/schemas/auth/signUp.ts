import { z } from 'zod'

export const signUpSchema = z
	.object({
		userName: z.string({ message: 'Имя должно быть строкой' }).nonempty(),
		email: z.string({ message: 'Почта должна быть строкой' }).email({ message: 'Некорректная почта' }).nonempty(),
		password: z.string({ message: 'Пароль должен быть строкой' }).min(6, { message: 'Не менее 6 символов' }).nonempty(),
		passwordRepeat: z.string({ message: 'Пароль должен быть строкой' }).nonempty()
	})
	.refine(({ password, passwordRepeat }) => password === passwordRepeat, {
		message: 'Пароли не совпадают',
		path: ['passwordRepeat']
	})

export type TypeSignUpSchema = z.infer<typeof signUpSchema>
