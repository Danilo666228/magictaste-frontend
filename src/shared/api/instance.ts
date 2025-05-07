import fetches from '@siberiacancode/fetches'

import { API_URL } from '@/lib/constants/url.constants'

export const api = fetches.create({
	baseURL: API_URL
})

api.interceptors.request.use(config => {
	config.credentials = 'include'
	return config
})
