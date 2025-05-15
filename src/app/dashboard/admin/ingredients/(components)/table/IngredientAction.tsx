import { Row } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/common'

import { DeleteIngredient } from './actions/DeleteIngredient'
import { IngredientColumn } from './columns'
import {
	UploadImageIngredient
} from '@/app/dashboard/admin/ingredients/(components)/table/actions/UploadImageIngredient'


interface IngredientActions {
	row: Row<IngredientColumn>
}

export function IngredientActions({ row }: IngredientActions) {


	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">
					<MoreHorizontal />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center">
				<DropdownMenuLabel>Действие</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DeleteIngredient ingredientId={row.original.id} />
				<UploadImageIngredient ingredientId={row.original.id} />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
