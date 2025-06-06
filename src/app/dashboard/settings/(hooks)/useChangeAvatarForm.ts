import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { useProfile } from '@/hooks/useProfile'

import { useChangeAvatarMutation } from '@/shared/api/hooks/account/useChangeAvatarMutation'
import { useDeleteAvatarMutation } from '@/shared/api/hooks/account/useDeleteAvatarMutation'

export function useChangeAvatarForm() {
	const queryClient = useQueryClient()
	const [file, setFile] = useState<File | null>(null)
	const { profile, isPending, refetch } = useProfile()

	const { mutateAsync: deleteAvatar } = useDeleteAvatarMutation({
		options: { onSettled: () => queryClient.invalidateQueries({ queryKey: ['getProfile'] }) }
	})

	const { mutateAsync: changeAvatar, error } = useChangeAvatarMutation({
		options: { onSettled: () => queryClient.invalidateQueries({ queryKey: ['getProfile'] }) }
	})

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFile = event.target.files?.[0]
		if (!newFile) return

		setFile(newFile)
		const formData = new FormData()
		formData.append('file', newFile)

		changeAvatar({
			params: { formData }
		})
	}

	const handleDeleteAvatar = () => deleteAvatar({})
	return {
		profile,
		file,
		isPending,
		error,
		handleFileChange,
		handleDeleteAvatar
	}
}
