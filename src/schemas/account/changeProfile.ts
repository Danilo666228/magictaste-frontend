import { z } from 'zod'

export const changeProfileSchema = z.object({
	email : z.string({ message: 'Почта должна быть строкой' }).email({ message: 'Некорректная почта' }).nonempty(),
	userName : z.string({ message: 'Имя должно быть строкой' }).nonempty()
})

export type ChangeProfileSchema = z.infer<typeof changeProfileSchema>