import { api } from '@/shared/api/instance'

interface ChangeProfileParams {
	email : string
	userName : string
}

export type ChangeProfileRequestConfig = RequestConfig<ChangeProfileParams>


export const changeProfile = ({ params, config }: ChangeProfileRequestConfig) => api.put('/profile', params, config)