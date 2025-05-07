import { z } from 'zod'

import { languages } from '@/lib/i18n/i18n.config'

export const changeLanguageSchema = z.object({
	language: z.enum(languages)
})

export type ChangeLanguageSchema = z.infer<typeof changeLanguageSchema>
