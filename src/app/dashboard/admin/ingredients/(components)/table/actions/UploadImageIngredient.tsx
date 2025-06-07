import { DropdownMenuItem } from '@/components/ui/common'
import { ImageUpload } from '@/components/ui/elements/image-upload/ImageUpload'
import { Modal } from '@/components/ui/elements/modal/Default/Modal'
import { useChangeIngredientImageMutation } from '@/shared/api/hooks/ingredient/useChangeIngedientImageMutation'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

interface UploadImageIngredientProps {
	ingredientId: string
}

export function UploadImageIngredient({ ingredientId }: UploadImageIngredientProps) {
	const queryClient = useQueryClient()

	const [isOpen, setIsOpen] = useState(false)

	const { mutateAsync: uploadImage } = useChangeIngredientImageMutation({
		options: {
			onSettled: () => queryClient.invalidateQueries({ queryKey: ['getIngredients'] })
		},
		config: {
			headers: {
				ContentType: 'multipart/form-data'
			}
		}
	})
	return (
		<Modal
			title='Изменение изображения'
			description='Выберите изображение для ингредиента'
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
			onOpenChange={setIsOpen}>
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
