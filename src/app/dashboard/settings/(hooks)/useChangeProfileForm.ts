import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useProfile } from '@/hooks/useProfile'

import { ChangeProfileSchema, changeProfileSchema } from '@/schemas/account/changeProfile'

import { useChangeProfileMutation } from '@/shared/api/hooks/profile/useChangeProfileMutation'

export function useChangeProfileForm() {
	const { profile, refetch, isPending: isProfilePending } = useProfile()

	const { mutateAsync: changeProfile, isPending } = useChangeProfileMutation({
		options: {
			onSuccess() {
				refetch()
			},
			onError() {
				form.reset()
			}
		}
	})
	const form = useForm<ChangeProfileSchema>({
		resolver: zodResolver(changeProfileSchema),
		values: {
			email: profile?.data.email ?? '',
			userName: profile?.data.userName ?? ''
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

	return { form, isPending, isProfilePending, onSubmit }
}
