import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useProfile } from '@/hooks/useProfile'

import { ChangeNotificationSettingsSchema, changeNotificationSettingsSchema } from '@/schemas/account/changeNotificationSettings'

import { useChangeNotificationSettingsMutation } from '@/shared/api/hooks/profile/useChangeNotificationMutation'

export function useChangeNotificationForm() {
	const { profile, refetch } = useProfile()
	const { mutate: changeSettings, isPending } = useChangeNotificationSettingsMutation({
		options: {
			onSuccess: ({ data }) => {
				refetch()

				if (data.token) {
					window.open(`http://t.me/magictaste_bot?start=${data.token}`, '_blank')
				}
			}
		}
	})

	const form = useForm<ChangeNotificationSettingsSchema>({
		values: {
			siteNotifications: profile?.data.accountSettings.siteNotification ?? false,
			telegramNotifications: profile?.data.accountSettings.telegramNotification ?? false
		},
		resolver: zodResolver(changeNotificationSettingsSchema)
	})

	function onChange(key: keyof ChangeNotificationSettingsSchema, value: boolean) {
		form.setValue(key, value)

		changeSettings({
			params: form.getValues()
		})
	}

	return { onChange, form, isPending, profile }
}
