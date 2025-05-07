import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { ChangePasswordSchema } from '@/schemas/account/changePassword'
import { changePasswordSchema } from '@/schemas/account/changePassword'

import { useChangePasswordMutation } from '@/shared/api/hooks/profile/useChangePasswordMutation'

export function useChangePasswordForm() {
	const { mutate: changePassword, isPending } = useChangePasswordMutation({
		options: {
			onSuccess: () => {
				form.reset()
			}
		}
	})
	const form = useForm<ChangePasswordSchema>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			oldPassword: '',
			newPassword: ''
		}
	})

	const onSubmit = (data: ChangePasswordSchema) => {
		changePassword({ params: { oldPassword: data.oldPassword, newPassword: data.newPassword } })
	}

	return { form, onSubmit, isPending }
}
