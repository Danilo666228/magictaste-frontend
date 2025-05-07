import { Heading } from '@/components/ui/common'

import { ChangeNotificationForm } from './(components)/ChangeNotificationForm'

export default function NotificationSettingsPage() {
	return (
		<>
			<Heading title='Уведомления' description='Управление уведомлениями' />
			<ChangeNotificationForm />
		</>
	)
}
