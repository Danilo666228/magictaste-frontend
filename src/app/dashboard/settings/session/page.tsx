'use client'

import { SessionList } from './(components)/SessionList'
import { Heading } from '@/components/ui/common'

export default function SessionSettingsPage() {
	return (
		<>
			<Heading title='Сессии' description='Управление сессиями' />
			<SessionList />
		</>
	)
}
