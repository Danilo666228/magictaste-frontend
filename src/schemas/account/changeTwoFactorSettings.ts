import { z } from 'zod'

export const enableTwoFactorEmail = z.object({
	isTwoFactorEnabled: z.boolean()
})

export type ChangeTwoFactorSettingsSchema = z.infer<typeof enableTwoFactorEmail>
