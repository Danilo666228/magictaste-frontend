import { ChangeNotificationForm } from './(components)/ChangeNotificationForm'
import { Heading } from '@/components/ui/common'

export default function NotificationSettingsPage() {
	return (
		<>
			<Heading title='Уведомления' description='Управление уведомлениями' />
			<ChangeNotificationForm />
		</>
	)
}
