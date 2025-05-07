import { api } from '@/shared/api/instance'
import { Account } from '@/shared/api/types'

export interface SignUpParams {
	userName: string
	email: string
	password: string
	passwordRepeat: string
	recaptcha?: string
}

export type SignUpRequestConfig = RequestConfig<SignUpParams>

export interface SignUpResponse {
	account: Account[]
}

export const signUp = ({ params, config }: SignUpRequestConfig) =>
	api.post<SignUpResponse>('/auth/sign-up', params, { headers: { Recaptcha: params.recaptcha ?? '' }, ...config })
