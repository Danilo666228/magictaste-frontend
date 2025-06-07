import { TwoFactorSettings } from './(components)/TwoFactorSettings'
import { Heading } from '@/components/ui/common'

export default function AccountSettingsPage() {
	return (
		<>
			<Heading title='Аккаунт' description='Изменение настроек аккаунта' />
			<TwoFactorSettings />
		</>
	)
}
