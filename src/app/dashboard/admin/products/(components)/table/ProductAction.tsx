import { useQueryClient } from '@tanstack/react-query'
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

import { useProfile } from '@/hooks/useProfile'

import { useChangeProductImageMutation } from '@/shared/api/hooks/products/useChangeProductImageMutation'

import { ChangeStatusSale } from './actions/ChangeStatusSale'
import { DeleteProductMenuItem } from './actions/DeleteProductMenuItem'
import { ProductColumn } from './columns'

interface ProductsActions {
	row: Row<ProductColumn>
}

export function ProductsActions({ row }: ProductsActions) {
	const queryClient = useQueryClient()
	const { profile } = useProfile()
	const [isOpen, setIsOpen] = useState(false)
	const { mutateAsync: uploadImage } = useChangeProductImageMutation({
		options: {
			onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getProducts'] })
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
				{profile?.data?.roles.some(role => role.name === 'SUPER_ADMIN') && <DeleteProductMenuItem productId={row.original.id} />}
				<FormModal
					title='Изменение изображения'
					description='Выберите изображение для категории'
					renderForm={() => (
						<ImageUpload
							onSubmit={async file => {
								const formData = new FormData()
								formData.append('file', file)
								uploadImage({ params: { productId: row.original.id, formData } })
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
				<ChangeStatusSale onSale={row.original.onSale} productId={row.original.id} />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
