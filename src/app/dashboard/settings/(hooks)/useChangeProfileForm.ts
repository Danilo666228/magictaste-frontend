import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { ChangeProfileSchema, changeProfileSchema } from '@/schemas/account/changeProfile'

import { useChangeProfileMutation } from '@/shared/api/hooks/profile/useChangeProfileMutation'
import { useProfile } from '@/shared/utils/contexts'

export function useChangeProfileForm() {
	const queryClient = useQueryClient()
	const profileQuery = useProfile()

	const { mutateAsync: changeProfile, isPending } = useChangeProfileMutation({
		options: {
			onSettled() {
				queryClient.invalidateQueries({ queryKey: ['getProfile'] })
			},
			onError() {
				form.reset()
			}
		}
	})
	const form = useForm<ChangeProfileSchema>({
		resolver: zodResolver(changeProfileSchema),
		values: {
			email: profileQuery.profile?.email ?? '',
			userName: profileQuery.profile?.userName ?? ''
		}
	})

	function onSubmit(data: ChangeProfileSchema) {
		changeProfile({
			params: {
				email: data.email,
				userName: data.userName
			}
		})
	}

	return { form, isPending, onSubmit }
}
