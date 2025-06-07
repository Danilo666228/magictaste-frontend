import { Heading } from '@/components/ui/common'

import { ChangeAvatarForm } from './(components)/ChangeAvatarForm'
import { ChangePasswordForm } from './(components)/ChangePasswordForm'
import { ChangeProfileForm } from './(components)/ChangeProfileForm'

export default function ProfileSettingsPage() {
	return (
		<div className='space-y-5'>
			<Heading title='Мой профиль' description='Редактирование профиля' />
			<ChangeAvatarForm />
			<div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
				<ChangeProfileForm />
				<ChangePasswordForm />
			</div>
		</div>
	)
}
