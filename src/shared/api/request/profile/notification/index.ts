import { api } from '@/shared/api/instance'
import { AccountSettings } from '@/shared/api/types'

export interface ChangeNotificationSettingsParams {
	siteNotifications: boolean
	telegramNotifications: boolean
}

export type ChangeNotificationSettingsRequestConfig = RequestConfig<ChangeNotificationSettingsParams>

interface ChangeNotificationSettingsResponse {
	accountSettings: AccountSettings
	token?: string
}

export const changeNotificationSettings = ({ params, config }: ChangeNotificationSettingsRequestConfig) =>
	api.put<ChangeNotificationSettingsResponse>('/profile/notification', params, config)
