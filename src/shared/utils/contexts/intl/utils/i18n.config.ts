export const COOKIE_LANGUAGE = 'language'
export const languages = ['ru', 'en'] as const
export const defaultLanguage = 'ru'

export type Language = (typeof languages)[number]
