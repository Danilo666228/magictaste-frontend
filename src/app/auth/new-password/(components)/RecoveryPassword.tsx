import { RecoveryPasswordForm } from './RecoveryPasswordForm'
import { Form, FormField, Typography } from '@/components/ui/common'

export function RecoveryPassword() {
	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-center'>
				<Typography tag='h3'>Восстановление пароля</Typography>
			</div>

			<RecoveryPasswordForm />
		</div>
	)
}
