import { api } from '@/shared/api/instance'

export interface SignInParams {
	email: string
	password: string
	totpCode?: string
	emailCode?: string
	recaptcha: string
}

export type SignInRequestConfig = RequestConfig<SignInParams>

export interface SignInResponse {
	message: string
	requiredMethods?: {
		totp: boolean
		email: boolean
	}
}

export const signIn = ({ params, config }: SignInRequestConfig) => {
	return api.post<SignInResponse>('/auth/sign-in', params, { headers: { Recaptcha: params.recaptcha }, ...config })
}
