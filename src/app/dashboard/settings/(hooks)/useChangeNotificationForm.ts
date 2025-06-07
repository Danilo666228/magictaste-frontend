import { ChangeNotificationSettingsSchema, changeNotificationSettingsSchema } from '@/schemas/account/changeNotificationSettings'
import { useChangeNotificationSettingsMutation } from '@/shared/api/hooks/profile/useChangeNotificationMutation'
import { useProfile } from '@/shared/utils/contexts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

export function useChangeNotificationForm() {
	const queryClient = useQueryClient()
	const { profile } = useProfile()
	const { mutate: changeSettings, isPending } = useChangeNotificationSettingsMutation({
		options: {
			onSettled: () => queryClient.invalidateQueries({ queryKey: ['getProfile'] }),
			onSuccess: ({ data }) => {
				if (data.token) {
					window.open(`http://t.me/magictaste_bot?start=${data.token}`, '_blank')
				}
			}
		}
	})

	const form = useForm<ChangeNotificationSettingsSchema>({
		values: {
			siteNotifications: profile?.accountSettings.siteNotification ?? false,
			telegramNotifications: profile?.accountSettings.telegramNotification ?? false
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
