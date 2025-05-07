'use server'

import { cookies } from 'next/headers'

import { COOKIE_LANGUAGE, Language, defaultLanguage } from '@/lib/i18n/i18n.config'

export async function getCurrentLanguage() {
	const cookieStore = await cookies()
	const language = cookieStore.get(COOKIE_LANGUAGE)?.value ?? defaultLanguage

	return language
}
export async function setLanguage(language: Language) {
	const cookieStore = await cookies()

	return cookieStore.set(COOKIE_LANGUAGE, language)
}
