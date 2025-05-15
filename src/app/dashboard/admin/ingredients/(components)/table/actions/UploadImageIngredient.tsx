import { DropdownMenuItem } from '@/components/ui/common'
import { ImageUpload } from '@/components/ui/elements/image-upload/ImageUpload'
import { Modal } from '@/components/ui/elements/modal/Default/Modal'
import { useState } from 'react'
import { useChangeIngredientImageMutation } from '@/shared/api/hooks/ingredient/useChangeIngedientImageMutation'
import { useQueryClient } from '@tanstack/react-query'
import { useGetIngredientsQuery } from '@/shared/api/hooks/ingredient/useGetIngredientsQuery'

interface UploadImageIngredientProps {
	ingredientId: string
}

export function UploadImageIngredient({ ingredientId }: UploadImageIngredientProps) {
	const queryClient = useQueryClient()
	const { refetch } = useGetIngredientsQuery()
	const [isOpen, setIsOpen] = useState(false)

	const { mutateAsync: uploadImage } = useChangeIngredientImageMutation({
		options: {
			onSuccess: () => refetch()
		},
		config: {
			headers: {
				ContentType: 'multipart/form-data'
			}
		}
	})
	return (
		<Modal
			title="Изменение изображения"
			description="Выберите изображение для ингредиента"
			trigger={
				<DropdownMenuItem
					onSelect={event => {
						event.preventDefault()
						setIsOpen(true)
					}}>
					Изменить изображение
				</DropdownMenuItem>
			}
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<ImageUpload
				onSubmit={async file => {
					const formData = new FormData()
					formData.append('file', file)
					await uploadImage({ params: { ingredientId, formData } })
				}}
			/>
		</Modal>
	)
}