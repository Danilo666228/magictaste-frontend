import { API_URL } from '@/shared/utils/constants/env'
import fetches from '@siberiacancode/fetches'

export const api = fetches.create({
	baseURL: API_URL
})

api.interceptors.request.use(config => {
	config.credentials = 'include'
	return config
})
