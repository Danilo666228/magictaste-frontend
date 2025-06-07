import { Heading } from '@/components/ui/common'

import { TwoFactorSettings } from './(components)/TwoFactorSettings'

export default function AccountSettingsPage() {
	return (
		<>
			<Heading title='Аккаунт' description='Изменение настроек аккаунта' />
			<TwoFactorSettings />
		</>
	)
}
