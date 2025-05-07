import { useState } from 'react'

import { DropdownMenuItem } from '@/components/ui/common'
import { ImageUpload } from '@/components/ui/elements/image-upload/ImageUpload'
import { FormModal } from '@/components/ui/elements/modal/FormModal/FormModal'

import { useChangeCategoryImageMutation } from '@/shared/api/hooks/category/useChangeCategoryImageMutation'
import { useGetCategoryQuery } from '@/shared/api/hooks/category/useGetCategoryQuery'

interface ChangeCategoryImageProps {
	categoryId: string
}

export function ChangeCategoryImage({ categoryId }: ChangeCategoryImageProps) {
	const [isOpen, setIsOpen] = useState(false)
	const { refetch } = useGetCategoryQuery()
	const { mutateAsync: uploadImage } = useChangeCategoryImageMutation({
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
		<FormModal
			title='Изменение изображения'
			description='Выберите изображение для категории'
			renderForm={() => (
				<ImageUpload
					onSubmit={async file => {
						const formData = new FormData()
						formData.append('file', file)
						uploadImage({ params: { categoryId, formData } })
					}}
				/>
			)}
			trigger={
				<DropdownMenuItem
					onSelect={event => {
						event.preventDefault()
						setIsOpen(true)
					}}>
					Изменить изображение
				</DropdownMenuItem>
			}
			isOpen={isOpen}
			onOpenChange={setIsOpen}
		/>
	)
}
