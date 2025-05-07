import { useMutation } from '@tanstack/react-query'

import { ChangeNotificationSettingsRequestConfig, changeNotificationSettings } from '../../request/profile'

export const useChangeNotificationSettingsMutation = (
	settings?: MutationSettings<ChangeNotificationSettingsRequestConfig, typeof changeNotificationSettings>
) =>
	useMutation({
		mutationKey: ['changeNotificationSettings'],
		mutationFn: ({ config, params }) => changeNotificationSettings({ params, config: { ...settings?.config, ...config } }),
		...settings?.options
	})
