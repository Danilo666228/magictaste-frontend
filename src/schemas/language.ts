import { languages } from '@/shared/utils/contexts/intl/utils/i18n.config'
import { z } from 'zod'

export const changeLanguageSchema = z.object({
	language: z.enum(languages)
})

export type ChangeLanguageSchema = z.infer<typeof changeLanguageSchema>
