import { Row } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/common'
import { ImageUpload } from '@/components/ui/elements/image-upload/ImageUpload'
import { FormModal } from '@/components/ui/elements/modal/FormModal/FormModal'

import { useChangeIngredientImageMutation } from '@/shared/api/hooks/ingredient/useChangeIngedientImageMutation'
import { useGetIngredientsQuery } from '@/shared/api/hooks/ingredient/useGetIngredientsQuery'

import { DeleteIngredient } from './actions/DeleteIngredient'
import { IngredientColumn } from './columns'

interface IngredientActions {
	row: Row<IngredientColumn>
}

export function IngredientActions({ row }: IngredientActions) {
	const [isOpen, setIsOpen] = useState(false)
	const { refetch } = useGetIngredientsQuery()
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
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost'>
					<MoreHorizontal />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='center'>
				<DropdownMenuLabel>Действие</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DeleteIngredient ingredientId={row.original.id} />
				<FormModal
					title='Изменение изображения'
					description='Выберите изображение для категории'
					renderForm={() => (
						<ImageUpload
							onSubmit={async file => {
								const formData = new FormData()
								formData.append('file', file)
								uploadImage({ params: { ingredientId: row.original.id, formData } })
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
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
